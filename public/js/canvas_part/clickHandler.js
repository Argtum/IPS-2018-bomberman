import {getCurrentPosition} from './arenaMap.js';
import {createBomb, BOMB_LIFETIME, ARENA_CELL} from './gameObjects.js';

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
        bomber.direction = 'left';
    }
    if (bomber.isPressed(bomber.keyCode.RIGHT)) {
        directionForce = directionForce.add(Direction.RIGHT);
        bomber.direction = 'right';
    }
    if (bomber.isPressed(bomber.keyCode.UP)) {
        directionForce = directionForce.add(Direction.UP);
        bomber.direction = 'up';
    }
    if (bomber.isPressed(bomber.keyCode.DOWN)) {
        directionForce = directionForce.add(Direction.DOWN);
        bomber.direction = 'down';
    }
    return directionForce;
}

function handlerForBomb(bomber, place) {
    if (bomber.isPressed(bomber.keyCode.DROP)) {
        const bombPosition = getCurrentPosition(bomber);
        const xPosition = Math.floor(bombPosition.x / ARENA_CELL);
        const yPosition = Math.floor(bombPosition.y / ARENA_CELL);

        if (place.whatType(xPosition, yPosition) == 'empty' && bomber.numberOfBombs > 0) {
            place.takePlace(createBomb(bombPosition, BOMB_LIFETIME, bomber.id), 'bomb');
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
