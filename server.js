const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080});
const UPDATE_INTERVAL = 1000; //милисекунд
let games = [];

server.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

server.on('connection', ws => {
    ws.id = server.getUniqueID();
    console.log('соединение установлено для ' + ws.id);

    ws.on('message', param => {
        const response = encodeResponse(param);

        if (response.status == 'initNewGame') {
            games.push(initNewGame(response, ws.id));
        } else if (response.status == 'join') {
            addPlayerToGame(games, response, ws.id)
        }
    });

    setInterval(sendAllData, UPDATE_INTERVAL, games);

    ws.on('close', function() {
        console.log('соединение закрыто ' + ws.id);
        deletePlayerFromGame(ws.id);
        delete ws;
    });
});

console.log('ONLINE');

function deletePlayerFromGame(playerId) {
    games.forEach(function each(game) {
        game.users.forEach(function each(user) {
            if (user.id == playerId) {
                game.deletePlayer(playerId);
            }
        })
    })
}

function sendAllData(games) {
    games.forEach(function each(game) {
        const data = prepareOutputData(game);
        if (game.status == 'gettingStarted') {
            game.status = 'playOn'
        }
        if (game.numberOfPlayers == game.gameData.numberOfPlayers) {
            game.status = 'gettingStarted';
        }
        if (game.status == 'playOn' || game.status == 'gettingStarted') {
            game.users.forEach(function each(user) {
                server.clients.forEach(function each(client) {
                    if (user.id == client.id) {
                        client.send(data);
                    }
                })
            });
        } else if (game.status == 'waitingRoom') {
            server.clients.forEach(function each(client) {
                client.send(data);
            });
        }
        console.log(game.id, game.status);
    });
}

function addPlayerToGame(games, response, id) {
    games.forEach(function each(game) {
        if (game.id == response.gameId) {
            const user = createUser(id, response);
            game.addPlayer(user);
        }
    })
}

function createUser(id, response) {
    return {
        'id': id,
        'name': response.playerName
    }
}

function prepareOutputData(game) {
    return JSON.stringify(game);
}

function encodeResponse(response) {
    return JSON.parse(response);
}

function initNewGame(response, id) {
    const gameId = server.getUniqueID();
    const game = createGame(gameId, 'waitingRoom', response.gameData);
    const player = createUser(id, response);
    game.addPlayer(player);

    return game;
}

function Game(id, status, data, users) {
    this.id = id;
    this.status = status;
    this.gameData = data;
    this.users = users;
    this.numberOfPlayers = 0;

    this.addPlayer = function (user) {
        this.users.push(user);
        this.numberOfPlayers++;
    };

    this.deletePlayer = function (playerId) {
        this.users.forEach(function(item, index, object) {
            if (item.id == playerId) {
                if (index == 0) {
                    this.status = 'end'
                } else {
                    object.splice(index, 1);
                }
            }
        });
        this.numberOfPlayers--;
    }
}

function createGame(gameId, gameStatus, gameGame) {
    const id = gameId;
    const status = gameStatus;
    const data = gameGame;
    let users = [];

    return new Game(id, status, data, users);
}
