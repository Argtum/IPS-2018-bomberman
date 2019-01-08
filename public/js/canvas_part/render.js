import {NUMBER_OF_CELL_X, NUMBER_OF_CELL_Y} from './gameObjects.js';

function drawBattleArena(ctx, arena) {
    ctx.fillStyle = arena.backgroundColor;
    ctx.fillRect(arena.startX, arena.startY, arena.arenaWidth, arena.arenaHeight);
}

function drawBarrier(ctx, barrier) {
    ctx.fillStyle = barrier.barrierColor;
    ctx.fillRect(barrier.position.x, barrier.position.y, barrier.width, barrier.height);
}

function drawBomb(ctx, bomb) {
    ctx.fillStyle = bomb.color;
    ctx.arc(bomb.position.x, bomb.position.y, bomb.radius, bomb.radiusStart, bomb.radiusEnd);
    ctx.fill();
    ctx.beginPath();
}

function drawBomber(ctx, bomber) {
    ctx.fillStyle = bomber.bomberColor;
    ctx.arc(bomber.position.x, bomber.position.y, bomber.radius, bomber.radiusStart, bomber.radiusEnd);
    ctx.fill();
    ctx.beginPath();
}

function redraw(ctx, arena, bombers, place) {
    drawBattleArena(ctx, arena);
    for (let j = 0; j < NUMBER_OF_CELL_Y; j++) {
        for (let i = 0; i < NUMBER_OF_CELL_X; i++) {
            const currentPlaceType = place.whatType(i, j);
            if (currentPlaceType == 'barrier' || currentPlaceType == 'block') {
                drawBarrier(ctx, place.getObj(i, j));
            } else if (currentPlaceType == 'bomb' || currentPlaceType == 'fire') {
                drawBomb(ctx, place.getObj(i, j));
            }
        }
    }

    if (bombers) {
        for (const bomber of bombers) {
            drawBomber(ctx, bomber);
        }
    }
}

export {
    redraw,
};
