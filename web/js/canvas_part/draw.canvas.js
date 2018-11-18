import {ARENA_CELL} from "./arena.canvas.js";

function DrawBattleArena(ctx, arena) {
    ctx.fillStyle = arena.backgroundColor;
    ctx.fillRect(arena.startX, arena.startY, arena.arenaWidth, arena.arenaHeight);
}

function DrawBarrier(ctx, barrier) {
    ctx.fillStyle = barrier.barrierColor;
    ctx.fillRect(barrier.startX, barrier.startY, barrier.width, barrier.height);
}

function DrawBomb(ctx, bomb) {
    ctx.fillStyle = bomb.color;
    ctx.arc(bomb.position.x, bomb.position.y, bomb.radius, bomb.radiusStart, bomb.radiusEnd);
    ctx.fill();
    ctx.beginPath();
}

// function DrawFire(ctx, explosions) {
//     ctx.fillStyle = explosions.fireColor;
//     ctx.fillRect(explosions.x - ARENA_CELL / 2, explosions.y - ARENA_CELL / 2, ARENA_CELL, ARENA_CELL);
// }

function DrawBomber(ctx, bomber) {
    ctx.fillStyle = bomber.bomberColor;
    ctx.arc(bomber.position.x, bomber.position.y, bomber.radius, bomber.radiusStart, bomber.radiusEnd);
    ctx.fill();
    ctx.beginPath();
}

function redraw(ctx, arena, bomber, indestructibleBarriers, bombs) {
    DrawBattleArena(ctx, arena);
    for (const barrier of indestructibleBarriers) {
        DrawBarrier(ctx, barrier);
    }
    if (bombs) {
        for (const bomb of bombs) {
            DrawBomb(ctx, bomb);
        }
    }
    DrawBomber(ctx, bomber);
}

export {
    redraw,
};