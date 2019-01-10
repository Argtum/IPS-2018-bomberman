import {Vec2, Direction} from './clickHandler.js';
import {createBomb, EXPLOSION_TIME, ARENA_CELL, NUMBER_OF_CELL_X, NUMBER_OF_CELL_Y, FIRE_IMG_COORDINATES} from './gameObjects.js';

function checkFireEnd(fireRadius, radius, mainBomb) {
    const tmp = fireRadius - radius;
    if (tmp == 1) {
        mainBomb.isFireEnd = true;
    }
    return mainBomb.isFireEnd;
}

function explosion(position, place, mainBomb, fireDirection, fireRadius, radius) {
    const currentObjType = place.whatType(position.x, position.y);
    if (currentObjType == 'empty') {
        const currentPosition = new Vec2(
            position.x * ARENA_CELL + ARENA_CELL/2,
            position.y * ARENA_CELL + ARENA_CELL/2
        );
        const fireLifeTime = mainBomb.lifeTime;
        place.takePlace(createBomb(currentPosition, fireLifeTime, 0), 'fire');
        place.getObj(position.x, position.y).img = FIRE_IMG_COORDINATES;
        place.getObj(position.x, position.y).fireComponent = fireDirection;
        place.getObj(position.x, position.y).isFireEnd = checkFireEnd(fireRadius, radius, mainBomb);
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

function setFireTiming(obj) {
    if (obj.lifeTime <= 0.05) {
        obj.fireTiming = 'small';
    } else if (obj.lifeTime <= 0.1) {
        obj.fireTiming = 'middle';
    } else if (obj.lifeTime <= 0.15) {
        obj.fireTiming = 'average';
    } else if (obj.lifeTime <= 0.2) {
        obj.fireTiming = 'big';
    } else if (obj.lifeTime <= 0.25) {
        obj.fireTiming = 'huge';
    } else if (obj.lifeTime <= 0.3) {
        obj.fireTiming = 'huge';
    } else if (obj.lifeTime <= 0.35) {
        obj.fireTiming = 'big';
    } else if (obj.lifeTime <= 0.4) {
        obj.fireTiming = 'average';
    } else if (obj.lifeTime <= 0.45) {
        obj.fireTiming = 'middle';
    } else if (obj.lifeTime <= 0.5) {
        obj.fireTiming = 'small';
    }
}

function trackLifeTime(place, bombers, dt) {
    for (let j = 0; j < NUMBER_OF_CELL_Y; j++) {
        for (let i = 0; i < NUMBER_OF_CELL_X; i++) {
            const mainBomb = place.getObj(i, j);
            if (place.whatType(i, j) == 'fire' || place.whatType(i, j) == 'bomb') {
                mainBomb.lifeTime -= dt;
                setFireTiming(mainBomb);
            }

            if (place.whatType(i, j) == 'fire' && mainBomb.lifeTime <= 0) {
                place.free(i, j);
            }

            if (place.whatType(i, j) == 'bomb' && mainBomb.lifeTime <= mainBomb.explosionTime) {
                returnBomb(i, j, place, bombers);
                const bombPlace = new Vec2(i, j);
                const fireDirection = {
                    'rightAllowed': 1,
                    'leftAllowed': 1,
                    'downAllowed': 1,
                    'upAllowed': 1,
                };
                const fireRadius = mainBomb.fireRadius;

                for (let radius = 1; radius < fireRadius; radius++) {
                    mainBomb.img = FIRE_IMG_COORDINATES;
                    if (i + radius < NUMBER_OF_CELL_X && fireDirection['rightAllowed']) {
                        fireDirection['rightAllowed'] = explosion(
                            bombPlace.add(Direction.RIGHT.multiplyScalar(radius)),
                            place,
                            mainBomb,
                            'right',
                            fireRadius,
                            radius
                        );
                    } else {
                        fireDirection['rightAllowed'] = 0;
                    }
                    if (i - radius >= 0 && fireDirection['leftAllowed']) {
                        fireDirection['leftAllowed'] = explosion(
                            bombPlace.add(Direction.LEFT.multiplyScalar(radius)),
                            place,
                            mainBomb,
                            'left',
                            fireRadius,
                            radius
                        );
                    } else {
                        fireDirection['leftAllowed'] = 0;
                    }
                    if (j + radius < NUMBER_OF_CELL_Y && fireDirection['downAllowed']) {
                        fireDirection['downAllowed'] = explosion(
                            bombPlace.add(Direction.DOWN.multiplyScalar(radius)),
                            place,
                            mainBomb,
                            'down',
                            fireRadius,
                            radius
                        );
                    } else {
                        fireDirection['downAllowed'] = 0;
                    }
                    if (j - radius >= 0 && fireDirection['upAllowed']) {
                        fireDirection['upAllowed'] = explosion(
                            bombPlace.add(Direction.UP.multiplyScalar(radius)),
                            place,
                            mainBomb,
                            'up',
                            fireRadius,
                            radius
                        );
                    } else {
                        fireDirection['upAllowed'] = 0;
                    }
                }
                place.takePlace(mainBomb, 'fire');
            }
        }
    }
}

export {
    trackLifeTime,
};
