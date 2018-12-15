import {BOMBERMAN_RADIUS} from './bomber.js';
import {NUMBER_OF_CELL_X, NUMBER_OF_CELL_Y} from './arena.js';
import {Vec2} from './clickHandler.js';

const X_COLLISION = new Vec2(0, 1);
const Y_COLLISION = new Vec2(1, 0);
const XY_COLLISION = new Vec2(0, 0);

function arenaCollisions(arena, moveDistance, nextPosition) {
    if (nextPosition.x < (arena.startX + BOMBERMAN_RADIUS) || nextPosition.x > (arena.arenaWidth - BOMBERMAN_RADIUS - 1)) {
        moveDistance = moveDistance.multiply(X_COLLISION);
    }
    if (nextPosition.y < (arena.startY + BOMBERMAN_RADIUS) || nextPosition.y > (arena.arenaHeight - BOMBERMAN_RADIUS - 1)) {
        moveDistance = moveDistance.multiply(Y_COLLISION);
    }
    return moveDistance;
}

function barrierCollisions(bomber, moveDistance, nextPosition, place) {
    let isCollision = false;

    for (let j = 0; j < NUMBER_OF_CELL_Y; j++) {
        for (let i = 0; i < NUMBER_OF_CELL_X; i++) {
            if (!isCollision && place.whatType(i, j) == 'barrier' &&
                nextPosition.x >= (place.getObj(i, j).position.x - BOMBERMAN_RADIUS) &&
                nextPosition.x <= (place.getObj(i, j).position.x + place.getObj(i, j).width + BOMBERMAN_RADIUS) &&
                nextPosition.y >= (place.getObj(i, j).position.y - BOMBERMAN_RADIUS) &&
                nextPosition.y <= (place.getObj(i, j).position.y + place.getObj(i, j).height + BOMBERMAN_RADIUS)) {
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

function collisionsProcessing(bomber, arena, moveDistance, place) {
    const nextPosition = bomber.position.add(moveDistance);

    moveDistance = arenaCollisions(arena, moveDistance, nextPosition);
    moveDistance = barrierCollisions(bomber, moveDistance, nextPosition, place);

    return moveDistance;
}

export {
    collisionsProcessing,
};
