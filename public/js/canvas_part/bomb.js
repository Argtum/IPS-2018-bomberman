import {ARENA_CELL, NUMBER_OF_CELL_X, NUMBER_OF_CELL_Y} from './gameObjects.js';
import {Vec2, Direction} from './clickHandler.js';
import {createBomb, FIRE_IMG, EXPLOSION_TIME} from './gameObjects.js';

function explosion(position, place, mainBomb, fireDirection) {
    const currentObjType = place.whatType(position.x, position.y);
    if (currentObjType == 'empty') {
        const currentPosition = new Vec2(position.x * ARENA_CELL + ARENA_CELL/2,
            position.y * ARENA_CELL + ARENA_CELL/2);
        const fireLifeTime = mainBomb.lifeTime;
        place.takePlace(createBomb(currentPosition, fireLifeTime, 0, FIRE_IMG), 'fire');
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
                place.getObj(i, j).color = FIRE_IMG;
                place.takePlace(place.getObj(i, j), 'fire');
            }
        }
    }
}

export {
    trackLifeTime,
};
