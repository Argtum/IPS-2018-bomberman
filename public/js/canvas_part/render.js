import {NUMBER_OF_CELL_X, NUMBER_OF_CELL_Y} from './gameObjects.js';

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
        barrier.position.x,
        barrier.position.y,
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

function getImageCoordinate(bomb) {
    let imageCoordinate;
    if (bomb.fireComponent == 'center') {
        imageCoordinate = bomb.img.center[bomb.fireTiming];
    } else {
        if (bomb.isFireEnd) {
            imageCoordinate = bomb.img[bomb.fireComponent]['end'][bomb.fireTiming];
        } else {
            imageCoordinate = bomb.img[bomb.fireComponent]['base'][bomb.fireTiming];
        }
    }
    return imageCoordinate
}

function drawFire(ctx, bomb, img) {
    let imageCoordinate = getImageCoordinate(bomb);
    ctx.drawImage(
        img,
        imageCoordinate.x,
        imageCoordinate.y,
        imageCoordinate.width,
        imageCoordinate.height,
        bomb.position.x - bomb.radius,
        bomb.position.y - bomb.radius,
        bomb.radius * 2,
        bomb.radius * 2
    );
}

function drawBomber(ctx, bomber, img) {
    const imageCoordinate = bomber.img[bomber.direction][bomber.animationType];
    ctx.drawImage(
        img,
        imageCoordinate.x,
        imageCoordinate.y,
        imageCoordinate.width,
        imageCoordinate.height,
        bomber.position.x - bomber.radius,
        bomber.position.y - bomber.radius,
        bomber.radius * 2,
        bomber.radius * 2
    );
}

function redraw(ctx, arena, bombers, place) {
    const img = new Image();
    img.onload = function() {
        drawBattleArena(ctx, arena);
        for (let j = 0; j < NUMBER_OF_CELL_Y; j++) {
            for (let i = 0; i < NUMBER_OF_CELL_X; i++) {
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
                drawBomber(ctx, bomber, img);
            }
        }
    };
    img.src = '../../img/bomberman_sprite.PNG';
}

export {
    redraw,
};
