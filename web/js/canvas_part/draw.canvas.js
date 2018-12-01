import {NUMBER_OF_CELL_X, NUMBER_OF_CELL_Y} from "./arena.canvas.js";

function DrawBattleArena(ctx, arena) {
    ctx.fillStyle = arena.backgroundColor;
    ctx.fillRect(arena.startX, arena.startY, arena.arenaWidth, arena.arenaHeight);
}

function DrawBarrier(ctx, barrier) {
    ctx.fillStyle = barrier.barrierColor;
    ctx.fillRect(barrier.position.x, barrier.position.y, barrier.width, barrier.height);
}

function DrawBomb(ctx, bomb) {
    ctx.fillStyle = bomb.color;
    ctx.arc(bomb.position.x, bomb.position.y, bomb.radius, bomb.radiusStart, bomb.radiusEnd);
    ctx.fill();
    ctx.beginPath();
}

function DrawBomber(ctx, bomber) {
    ctx.fillStyle = bomber.bomberColor;
    ctx.arc(bomber.position.x, bomber.position.y, bomber.radius, bomber.radiusStart, bomber.radiusEnd);
    ctx.fill();
    ctx.beginPath();
}

function redraw(ctx, arena, bombers, place) {
    DrawBattleArena(ctx, arena);
    for (let j = 0; j < NUMBER_OF_CELL_Y; j++) {
        for(let i = 0; i < NUMBER_OF_CELL_X; i++) {
            const currentPlaceType = place.whatType(i, j);
            if (currentPlaceType == 'barrier') {
                DrawBarrier(ctx, place.getObj(i, j));
            } else if(currentPlaceType == 'bomb') {
                DrawBomb(ctx, place.getObj(i, j));
            }
        }
    }

    if (bombers) {
        for (const bomber of bombers) {
            DrawBomber(ctx, bomber);
        }
    }
}

export {
    redraw,
};