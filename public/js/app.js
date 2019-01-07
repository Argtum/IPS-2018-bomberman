function registerClickOnSet(className, func)
{
    $(className).each(function()
    {
        $(this).click(func);
    });
}

function inc()
{
    const inputElement = this.previousElementSibling.firstElementChild;
    let currentValue = inputElement.getAttribute('value');
    const currentName = inputElement.getAttribute('name');
    if ((currentName == 'numberOfPlayers' && currentValue < 4) || (currentName == 'numberOfWins' && currentValue < 20)) {
        currentValue++;
        inputElement.setAttribute('value', currentValue);
    }
}

function dec()
{
    const inputElement = this.nextElementSibling.firstElementChild;
    let currentValue = inputElement.getAttribute('value');
    const currentName = inputElement.getAttribute('name');
    if ((currentName == 'numberOfPlayers' && currentValue > 2) || (currentName == 'numberOfWins' && currentValue > 5)) {
        currentValue--;
        inputElement.setAttribute('value', currentValue);
    }
}

$(window).on('load', function ()
{
    registerClickOnSet(".button_left", dec);
    registerClickOnSet(".button_right", inc);
});