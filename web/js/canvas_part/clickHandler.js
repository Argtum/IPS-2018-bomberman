import {getCurrentPosition, ARENA_CELL} from './arena.js';
import {createBomb, BOMB_LIFETIME, BOMB_COLOR} from './bomb.js';

const keyCode = {
    //PLAYER 1
    SPACE: 32,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
    //PLAYER 2
    // SPACE: 32,
    // LEFT_ARROW: 37,
    // UP_ARROW: 38,
    // RIGHT_ARROW: 39,
    // DOWN_ARROW: 40,
};
Object.freeze(keyCode);

function ClickHandler() {
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

function Vec2(x, y) {
    this.x = x;
    this.y = y;

    this.add = function(vec) {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    };
    this.multiplyScalar = function(scalar) {
        return new Vec2(this.x * scalar, this.y * scalar);
    };
    this.multiply = function(vec) {
        return new Vec2(this.x * vec.x, this.y * vec.y);
    };
    Object.freeze(this);
}
Vec2.ZERO = new Vec2(0, 0);

const Direction = {
    UP: new Vec2(0, -1),
    DOWN: new Vec2(0, 1),
    LEFT: new Vec2(-1, 0),
    RIGHT: new Vec2(1, 0),
};
Object.freeze(Direction);

function handlerForBomber(bomber, keyMap) {
    let directionForce = Vec2.ZERO;
    if (keyMap.isPressed(keyCode.LEFT_ARROW)) {
        directionForce = directionForce.add(Direction.LEFT);
    }
    if (keyMap.isPressed(keyCode.RIGHT_ARROW)) {
        directionForce = directionForce.add(Direction.RIGHT);
    }
    if (keyMap.isPressed(keyCode.UP_ARROW)) {
        directionForce = directionForce.add(Direction.UP);
    }
    if (keyMap.isPressed(keyCode.DOWN_ARROW)) {
        directionForce = directionForce.add(Direction.DOWN);
    }
    return directionForce;
}

function handlerForBomb(keyMap, bomber, place) {
    if (keyMap.isPressed(keyCode.SPACE)) {
        const bombPosition = getCurrentPosition(bomber);
        const xPosition = Math.floor(bombPosition.x / ARENA_CELL);
        const yPosition = Math.floor(bombPosition.y / ARENA_CELL);

        if (place.whatType(xPosition, yPosition) == 'empty' && bomber.numberOfBombs > 0) {
            place.takePlace(createBomb(bombPosition, BOMB_LIFETIME, bomber.number, BOMB_COLOR), 'bomb');
            bomber.numberOfBombs--;
        }
    }
}

export {
    Vec2,
    keyCode,
    Direction,
    handlerForBomber,
    handlerForBomb,
    ClickHandler,
};
