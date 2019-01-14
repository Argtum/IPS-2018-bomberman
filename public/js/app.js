const ws =  new WebSocket("ws://localhost:8080");

function registerClickOnSet(className, func) {
    $(className).each(function() {
        $(this).click(func);
    });
}

function inc() {
    const inputElement = this.previousElementSibling.firstElementChild;
    let currentValue = inputElement.getAttribute('value');
    const currentName = inputElement.getAttribute('name');
    if ((currentName == 'numberOfPlayers' && currentValue < 4) || (currentName == 'numberOfWins' && currentValue < 20)) {
        currentValue++;
        inputElement.setAttribute('value', currentValue);
    }
}

function dec() {
    const inputElement = this.nextElementSibling.firstElementChild;
    let currentValue = inputElement.getAttribute('value');
    const currentName = inputElement.getAttribute('name');
    if ((currentName == 'numberOfPlayers' && currentValue > 2) || (currentName == 'numberOfWins' && currentValue > 5)) {
        currentValue--;
        inputElement.setAttribute('value', currentValue);
    }
}

function displayNewGame(param) {
    $('#yourGameWindow').removeClass('invisible');
    $('#createdGameWindow').addClass('invisible').addClass('non-height');
    $('#createGame').addClass('invisible');
    $('#newGamePlayers').text(param.numberOfPlayers);
    $('#newGameWins').text(param.numberOfWins);
}

function getGameParameters() {
    const gameData = {
        'numberOfPlayers': $('#inputNumberOfPlayers').val(),
        'numberOfWins': $('#inputNumberOfWins').val(),
        'playerName': $('#userName').val()
    };

    displayNewGame(gameData);
    return gameData;
}

function initGame(ws) {
    const gameData = getGameParameters();
    const status = 'initNewGame';
    const outgoingData = JSON.stringify({
        'playerName': gameData.playerName,
        'status': status,
        'gameData': {
            'numberOfPlayers': gameData.numberOfPlayers,
            'numberOfWins': gameData.numberOfWins
        }
    });
    ws.send(outgoingData);
    return false;
}

function removeDynamicElements() {
    $('.notFullGames').remove();
}

function showNotFullGame(data) {
    let notFullGame =
        '<a href="#" class="notFullGames d-block" data-game-id="' + data.id + '"> '+
        '   Игра на ' +
            data.gameData.numberOfPlayers + ' игрока, до ' +
            data.gameData.numberOfWins + ' побед. Создал ' +
            data.users[0]['name'] +
        '</a>'
    ;

    removeDynamicElements();
    $('#gamesStatusField').append(notFullGame);
}

function getResponse(inputData) {
    const data = JSON.parse(inputData);
    if (data.status == 'waitingRoom') {
        showNotFullGame(data);
    } else if (data.status == 'gettingStarted') {
        // $.ajax({
        //     type: "GET",
        //     url: '/bomberman/game',
        //     data: {
        //         'numberOfPlayers': data.gameData.numberOfPlayers,
        //     },
        // });
        window.location.replace("/bomberman/game/" + data.gameData.numberOfPlayers);
    }
}

function getNotFullGames() {
    const outgoingData = JSON.stringify({
        'status': 'newPlayer',
    });
    ws.send(outgoingData);
    return false;
}

function connectionToGame (event) {
    event.preventDefault();
    const gameData = getGameParameters();
    const status = 'join';
    const outgoingData = JSON.stringify({
        'playerName': gameData.playerName,
        'status': status,
        'gameId': $(this).data("gameId")
    });
    ws.send(outgoingData);
    return false;
}

$(window).on('load', function () {
    registerClickOnSet(".button_left", dec);
    registerClickOnSet(".button_right", inc);
    $('#gamesStatusField').on('click', 'a', connectionToGame);

    ws.onmessage = function(event) {
        getResponse(event.data);
    };

    if ($('#createdGameWindow').hasClass('invisible')) {
        getNotFullGames();
    }

    $('#gameSettings').on('submit', event => {
        event.preventDefault();
        initGame(ws);
    });
});