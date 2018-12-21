import {NUMBER_OF_CELL_X, NUMBER_OF_CELL_Y} from './arena.js';
import {Vec2} from './clickHandler.js';
import {BOMB_RADIUS} from './bomb.js';

const X_COLLISION = new Vec2(0, 1);
const Y_COLLISION = new Vec2(1, 0);
const XY_COLLISION = new Vec2(0, 0);

function arenaCollisions(arena, moveDistance, nextPosition, bomber) {
    if (nextPosition.x < (arena.startX + bomber.radius) || nextPosition.x > (arena.arenaWidth - bomber.radius - 1)) {
        moveDistance = moveDistance.multiply(X_COLLISION);
    }
    if (nextPosition.y < (arena.startY + bomber.radius) || nextPosition.y > (arena.arenaHeight - bomber.radius - 1)) {
        moveDistance = moveDistance.multiply(Y_COLLISION);
    }
    return moveDistance;
}

function barrierCollisions(bomber, moveDistance, nextPosition, place) {
    let isCollision = false;

    for (let j = 0; j < NUMBER_OF_CELL_Y; j++) {
        for (let i = 0; i < NUMBER_OF_CELL_X; i++) {
            if (!isCollision && (place.whatType(i, j) == 'barrier' || place.whatType(i, j) == 'block') &&
                nextPosition.x >= (place.getObj(i, j).position.x - bomber.radius) &&
                nextPosition.x <= (place.getObj(i, j).position.x + place.getObj(i, j).width + bomber.radius) &&
                nextPosition.y >= (place.getObj(i, j).position.y - bomber.radius) &&
                nextPosition.y <= (place.getObj(i, j).position.y + place.getObj(i, j).height + bomber.radius)) {
                if (nextPosition.x == bomber.position.x) {
                    moveDistance = moveDistance.multiply(Y_COLLISION);
                } else if (nextPosition.y == bomber.position.y) {
                    moveDistance = moveDistance.multiply(X_COLLISION);
                } else {
                    moveDistance = moveDistance.multiply(XY_COLLISION);
                }
                isCollision = true;
            }
        }
    }
    return moveDistance;
}

function fireCollisions(bomber, moveDistance, nextPosition, place) {
    let isCollision = false;
    const safeDistance = bomber.radius + BOMB_RADIUS;
    for (let j = 0; j < NUMBER_OF_CELL_Y; j++) {
        for (let i = 0; i < NUMBER_OF_CELL_X; i++) {
            if (place.whatType(i, j) == 'fire') {
                const flashFire = place.getObj(i, j);
                if (Math.abs(bomber.position.x - flashFire.position.x) < safeDistance &&
                    Math.abs(bomber.position.y - flashFire.position.y) < safeDistance) {
                    isCollision = true;
                }
            }
        }
    }
    return isCollision;
}

function collisionsProcessing(bomber, arena, moveDistance, place) {
    const nextPosition = bomber.position.add(moveDistance);

    moveDistance = arenaCollisions(arena, moveDistance, nextPosition, bomber);
    moveDistance = barrierCollisions(bomber, moveDistance, nextPosition, place);
    const isBomberDed = fireCollisions(bomber, moveDistance, nextPosition, place);

    return {
        'distance': moveDistance,
        'died': isBomberDed,
    };
}

export {
    collisionsProcessing,
};
