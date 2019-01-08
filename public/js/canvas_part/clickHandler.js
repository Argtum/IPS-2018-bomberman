import {getCurrentPosition} from './arenaMap.js';
import {createBomb, BOMB_LIFETIME, BOMB_COLOR} from './gameObjects.js';
import {ARENA_CELL} from './gameObjects.js';

// const keyCode = {
//     //PLAYER 1
//     SPACE: 32,
//     LEFT_ARROW: 37,
//     UP_ARROW: 38,
//     RIGHT_ARROW: 39,
//     DOWN_ARROW: 40,
//     //PLAYER 2
//     SPACE: 32,
//     LEFT_ARROW: 37,
//     UP_ARROW: 38,
//     RIGHT_ARROW: 39,
//     DOWN_ARROW: 40,
// };
// Object.freeze(keyCode);

// function ClickHandler() {
//     this._map = {};
//
//     this.onKeyDown = function(keyCode) {
//         this._map[keyCode] = true;
//     };
//
//     this.onKeyUp = function(keyCode) {
//         delete this._map[keyCode];
//     };
//
//     this.isPressed = function(keyCode) {
//         return Boolean(this._map[keyCode]);
//     };
//
//     Object.freeze(this);
// }

function clickHandler(bombers) {
    for (const bomber of bombers) {
        document.addEventListener('keydown', (event) => {
            bomber.onKeyDown(event.keyCode);
            // event.stopPropagation();
            // event.preventDefault();
        });

        document.addEventListener('keyup', (event) => {
            bomber.onKeyUp(event.keyCode);
        });
    }
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

function handlerForBomber(bomber) {
    let directionForce = Vec2.ZERO;
    if (bomber.isPressed(bomber.keyCode.LEFT)) {
        directionForce = directionForce.add(Direction.LEFT);
    }
    if (bomber.isPressed(bomber.keyCode.RIGHT)) {
        directionForce = directionForce.add(Direction.RIGHT);
    }
    if (bomber.isPressed(bomber.keyCode.UP)) {
        directionForce = directionForce.add(Direction.UP);
    }
    if (bomber.isPressed(bomber.keyCode.DOWN)) {
        directionForce = directionForce.add(Direction.DOWN);
    }
    return directionForce;
}

function handlerForBomb(bomber, place) {
    if (bomber.isPressed(bomber.keyCode.DROP)) {
        const bombPosition = getCurrentPosition(bomber);
        const xPosition = Math.floor(bombPosition.x / ARENA_CELL);
        const yPosition = Math.floor(bombPosition.y / ARENA_CELL);

        if (place.whatType(xPosition, yPosition) == 'empty' && bomber.numberOfBombs > 0) {
            place.takePlace(createBomb(bombPosition, BOMB_LIFETIME, bomber.id, BOMB_COLOR), 'bomb');
            bomber.numberOfBombs--;
        }
    }
}

export {
    Vec2,
    Direction,
    handlerForBomber,
    handlerForBomb,
    clickHandler,
};
