import {NUMBER_OF_CELL_X, NUMBER_OF_CELL_Y, ARENA_CELL} from './arena.js';
import {Vec2, Direction} from './clickHandler.js';

const BOMB_RADIUS = 22;
const BOMB_START_ANGLE = 0;
const BOMB_END_ANGLE = Math.PI * 2;
const BOMB_COLOR = '#222';
const BOMB_LIFETIME = 3; //в милисекундах
const FIRE_SIZE = 3;
const FIRE_COLOR = '#FF0000';
const EXPLOSION_TIME = 0.5; //в милисекундах

function Bomb(bombPosition, radius, radiusStart, radiusEnd, bombColor, fireRadius, lifeTime, explosionTime, whoseBomb,
    allowedCollision) {
    this.position = bombPosition;
    this.radius = radius;
    this.radiusStart = radiusStart;
    this.radiusEnd = radiusEnd;
    this.color = bombColor;
    this.fireRadius = fireRadius;
    this.lifeTime = lifeTime;
    this.explosionTime = explosionTime;
    this.whoseBomb = whoseBomb;
    this.allowedCollision = allowedCollision;
}

function createBomb(position, lt, bomberId, color) {
    const bombPosition = position;
    const bombRadius = BOMB_RADIUS;
    const bombStartAngle = BOMB_START_ANGLE;
    const bombEndAngle = BOMB_END_ANGLE;
    const bombColor = color;
    const fireRadius = FIRE_SIZE;
    const lifeTime = lt;
    const explosionTime = EXPLOSION_TIME;
    const whoseBomb = bomberId;
    const allowedCollision = false;

    return new Bomb(
        bombPosition,
        bombRadius,
        bombStartAngle,
        bombEndAngle,
        bombColor,
        fireRadius,
        lifeTime,
        explosionTime,
        whoseBomb,
        allowedCollision
    );
}

function explosion(position, place, mainBomb, fireDirection) {
    const currentObjType = place.whatType(position.x, position.y);
    if (currentObjType == 'empty') {
        const currentPosition = new Vec2(position.x * ARENA_CELL + ARENA_CELL/2,
            position.y * ARENA_CELL + ARENA_CELL/2);
        const fireLifeTime = mainBomb.lifeTime;
        place.takePlace(createBomb(currentPosition, fireLifeTime, 0, FIRE_COLOR), 'fire');
    } else if (currentObjType == 'bomb') {
        place.getObj(position.x, position.y).lifeTime = EXPLOSION_TIME;
    } else if (currentObjType == 'block') {
        fireDirection = 0;
        place.free(position.x, position.y);
    } else if (currentObjType != 'fire') {
        fireDirection = 0;
    }
    return fireDirection;
}

function returnBomb(i, j, place, bombers) {
    bombers.forEach(function(bomber) {
        if (place.getObj(i, j).whoseBomb == bomber.id) {
            bomber.numberOfBombs++;
        }
    });
}

function trackLifeTime(place, bombers, dt) {
    for (let j = 0; j < NUMBER_OF_CELL_Y; j++) {
        for (let i = 0; i < NUMBER_OF_CELL_X; i++) {
            if (place.whatType(i, j) == 'fire' || place.whatType(i, j) == 'bomb') {
                place.getObj(i, j).lifeTime -= dt;
            }

            if (place.whatType(i, j) == 'fire' && place.getObj(i, j).lifeTime <= 0) {
                place.free(i, j);
            }

            if (place.whatType(i, j) == 'bomb' && place.getObj(i, j).lifeTime <= place.getObj(i, j).explosionTime) {
                returnBomb(i, j, place, bombers);
                const mainBomb = place.getObj(i, j);
                const bombPlace = new Vec2(i, j);
                const fireDirection = {
                    'rightAllowed': 1,
                    'leftAllowed': 1,
                    'downAllowed': 1,
                    'upAllowed': 1,
                };
                for (let radius = 1; radius < place.getObj(i, j).fireRadius; radius++) {
                    if (i + radius < NUMBER_OF_CELL_X && fireDirection['rightAllowed']) {
                        fireDirection['rightAllowed'] = explosion(bombPlace.add(Direction.RIGHT.multiplyScalar(radius)),
                            place, mainBomb, fireDirection['rightAllowed']);
                    } else {
                        fireDirection['rightAllowed'] = 0;
                    }
                    if (i - radius >= 0 && fireDirection['leftAllowed']) {
                        fireDirection['leftAllowed'] = explosion(bombPlace.add(Direction.LEFT.multiplyScalar(radius)),
                            place, mainBomb, fireDirection['leftAllowed']);
                    } else {
                        fireDirection['leftAllowed'] = 0;
                    }
                    if (j + radius < NUMBER_OF_CELL_Y && fireDirection['downAllowed']) {
                        fireDirection['downAllowed'] = explosion(bombPlace.add(Direction.DOWN.multiplyScalar(radius)),
                            place, mainBomb, fireDirection['downAllowed']);
                    } else {
                        fireDirection['downAllowed'] = 0;
                    }
                    if (j - radius >= 0 && fireDirection['upAllowed']) {
                        fireDirection['upAllowed'] = explosion(bombPlace.add(Direction.UP.multiplyScalar(radius)),
                            place, mainBomb, fireDirection['upAllowed']);
                    } else {
                        fireDirection['upAllowed'] = 0;
                    }
                }
                place.getObj(i, j).color = FIRE_COLOR;
                place.takePlace(place.getObj(i, j), 'fire');
            }
        }
    }
}

export {
    trackLifeTime,
    createBomb,
    BOMB_LIFETIME,
    BOMB_COLOR,
    BOMB_RADIUS,
};
