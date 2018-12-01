const keyCode = {
    SPACE: 32,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40
};
Object.freeze(keyCode);

function KeymapCanvas() {
    this._map = {};

    this.onKeyDown = function(keyCode) {
        this._map[keyCode] = true;
    };

    this.onKeyUp = function(keyCode) {
        delete this._map[keyCode];
    };

    this.isPressed = function(keyCode) {
        return Boolean(this._map[keyCode]);
    };

    Object.freeze(this);
}

export {
    keyCode,
    KeymapCanvas,
};