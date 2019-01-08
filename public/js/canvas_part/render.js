import {NUMBER_OF_CELL_X, NUMBER_OF_CELL_Y, ARENA_CELL, BARRIER_WIDTH, BARRIER_HEIGHT} from './gameObjects.js';

function drawBattleArena(ctx, arena) {
    ctx.fillStyle = arena.backgroundColor;
    ctx.fillRect(
        arena.startX,
        arena.startY,
        arena.arenaWidth,
        arena.arenaHeight
    );
}

function drawBarrier(ctx, barrier, img) {
    ctx.drawImage(
        img,
        barrier.imgStartX,
        barrier.imgStartY,
        barrier.imgWidth,
        barrier.imgHeight,
        barrier.position.x + (ARENA_CELL - BARRIER_WIDTH) / 2,
        barrier.position.y + (ARENA_CELL - BARRIER_HEIGHT) / 2,
        barrier.width,
        barrier.height
    );
}

function drawBomb(ctx, bomb, img) {
    ctx.drawImage(
        img,
        bomb.img[bomb.imgIndex].x,
        bomb.img[bomb.imgIndex].y,
        bomb.img[bomb.imgIndex].width,
        bomb.img[bomb.imgIndex].height,
        bomb.position.x - bomb.radius + bomb.imgIndex * 2,
        bomb.position.y - bomb.radius + bomb.imgIndex * 2,
        (bomb.radius - bomb.imgIndex * 2) * 2,
        (bomb.radius - bomb.imgIndex * 2) * 2
    );
}

function drawFire(ctx, bomb, img) {
    ctx.drawImage(
        img,
        bomb.imgStartX,
        bomb.imgStartY,
        bomb.imgWidth,
        bomb.imgHeight,
        bomb.position.x - bomb.radius,
        bomb.position.y - bomb.radius,
        bomb.radius * 2,
        bomb.radius * 2
    );
}

function drawBomber(ctx, bomber) {
    ctx.fillStyle = bomber.bomberColor;
    ctx.arc(
        bomber.position.x,
        bomber.position.y,
        bomber.radius,
        bomber.radiusStart,
        bomber.radiusEnd
    );
    ctx.fill();
    ctx.beginPath();
}

function drawGround(ctx, i, j, img)
{
    ctx.drawImage(
        img,
        121,
        174,
        17,
        17,
        i * ARENA_CELL,
        j * ARENA_CELL,
        ARENA_CELL,
        ARENA_CELL
    );
}

function redraw(ctx, arena, bombers, place) {
    const img = new Image();
    img.onload = function() {
        drawBattleArena(ctx, arena);
        for (let j = 0; j < NUMBER_OF_CELL_Y; j++) {
            for (let i = 0; i < NUMBER_OF_CELL_X; i++) {
                // drawGround(ctx, i, j, img);
                const currentPlaceType = place.whatType(i, j);
                if (currentPlaceType == 'barrier' || currentPlaceType == 'block') {
                    drawBarrier(ctx, place.getObj(i, j), img);
                } else if (currentPlaceType == 'bomb') {
                    drawBomb(ctx, place.getObj(i, j), img);
                } else if (currentPlaceType == 'fire') {
                    drawFire(ctx, place.getObj(i, j), img);
                }
            }
        }

        if (bombers) {
            for (const bomber of bombers) {
                drawBomber(ctx, bomber);
            }
        }
    };
    img.src = '../../img/bomberman_sprite.PNG';
}

export {
    redraw,
};
