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

function DrawBomber(ctx, bomber) {
    ctx.fillStyle = bomber.bomberColor;
    ctx.arc(bomber.position.x, bomber.position.y, bomber.radius, bomber.radiusStart, bomber.radiusEnd);
    ctx.fill();
    ctx.beginPath();
}

function redraw(ctx, arena, bombers, indestructibleBarriers, bombs) {
    DrawBattleArena(ctx, arena);
    for (const barrier of indestructibleBarriers) {
        DrawBarrier(ctx, barrier);
    }
    if (bombs) {
        for (const bomb of bombs) {
            DrawBomb(ctx, bomb);
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