const animationTime = 500;
const delayTime = 0;

function hideElement(elementId, dlay, duration)
{
    $(elementId).delay(dlay).fadeOut(duration);
}

function showElement(elementId, dlay, duration)
{
    $(elementId).delay(dlay).fadeIn(duration);
}

function showModal()
{
    $(elementId).delay(dlay).fadeIn(duration);
}

$(window).on('load', function ()
{
    showElement("#login", delayTime, animationTime);
    hideElement("#login", delayTime, animationTime);

    $('#login').on('click', function () {
        $('#qwe').fadeOut();
    })
});
