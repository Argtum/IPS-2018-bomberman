import {Vec2, BOMBERMAN_RADIUS} from "./bomber.canvas.js";

const X_COLLISION = new Vec2(0, 1);
const Y_COLLISION = new Vec2(1, 0);
const XY_COLLISION = new Vec2(0, 0);

function arenaCollisions(arena, moveDistance, nextPosition)
{
    if (nextPosition.x < (arena.startX + BOMBERMAN_RADIUS) || nextPosition.x > (arena.arenaWidth - BOMBERMAN_RADIUS - 1)) {
        moveDistance = moveDistance.multiply(X_COLLISION);
    }
    if (nextPosition.y < (arena.startY + BOMBERMAN_RADIUS) || nextPosition.y > (arena.arenaHeight - BOMBERMAN_RADIUS - 1)) {
        moveDistance = moveDistance.multiply(Y_COLLISION);
    }

    return moveDistance;
}

function barrierCollisions(bomber, barriers, moveDistance, nextPosition)
{
    let isCollision = false;

    for (const barrier of barriers) {
        if (!isCollision &&
            nextPosition.x >= (barrier.startX - BOMBERMAN_RADIUS) &&
            nextPosition.x <= (barrier.startX + barrier.width + BOMBERMAN_RADIUS) &&
            nextPosition.y >= (barrier.startY - BOMBERMAN_RADIUS) &&
            nextPosition.y <= (barrier.startY + barrier.height + BOMBERMAN_RADIUS)) {

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

    return moveDistance;
}

function collisionsProcessing(bomber, barriers, arena, moveDistance)
{
    const nextPosition = bomber.position.add(moveDistance);

    moveDistance = arenaCollisions(arena, moveDistance, nextPosition);
    moveDistance = barrierCollisions(bomber, barriers, moveDistance, nextPosition);

    return moveDistance;
}

export {
    collisionsProcessing,
};