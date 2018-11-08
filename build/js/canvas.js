import {
    createBomber,
} from "./canvas_part/bomber.js";

import {
    ARENA_CELL_HEIGHT,
    ARENA_CELL_WIDTH,
    createArena,
} from "./canvas_part/arena.js";

import {
    isRectContains,
    createBarriers,
} from "./canvas_part/barrier.js";

import {
    createBomb,
} from "./canvas_part/bomb.js";

const BUTTON = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};

const DIRECTION = {
    LEFT: -1,
    UP: -1,
    RIGHT: 1,
    DOWN: 1,
    NONE: 0,
};

function DrawBattleArena(ctx, arena) {
    ctx.fillStyle = arena.backgroundColor;
    ctx.fillRect(arena.startX, arena.startY, arena.arenaWidth, arena.arenaHeight);
}

function DrawBarrier(ctx, barrier) {
    ctx.fillStyle = barrier.barrierColor;
    ctx.fillRect(barrier.startX, barrier.startY, barrier.width, barrier.height);
}

function DrawBomb(positionX, positionY, radius, radiusStart, radiusEnd) {
    ctx.fillStyle = bomb.bomberColor;
    ctx.arc(bomb.x, bomb.y, bomb.radius, bomb.radiusStart, bomb.radiusEnd);
    ctx.fill();
    ctx.beginPath();
}

function DrawBomber(ctx, bomber) {
    ctx.fillStyle = bomber.bomberColor;
    ctx.arc(bomber.x, bomber.y, bomber.radius, bomber.radiusStart, bomber.radiusEnd);
    ctx.fill();
    ctx.beginPath();
}

function redraw(ctx, arena, bomber, indestructibleBarriers) {
    DrawBattleArena(ctx, arena);
    for (const barrier of indestructibleBarriers) {
        DrawBarrier(ctx, barrier);
    }
    DrawBomber(ctx, bomber);
}

function update(dt, bomber, barriers, arena) {
    const distance = dt * bomber.speed;

    document.addEventListener("keydown", (buttonkey) => {
        if (buttonkey.keyCode == BUTTON.LEFT) {
            bomber.directionX = DIRECTION.LEFT;
        }
        if (buttonkey.keyCode == BUTTON.UP) {
            bomber.directionY = DIRECTION.UP;
        }
        if (buttonkey.keyCode == BUTTON.RIGHT) {
            bomber.directionX = DIRECTION.RIGHT;
        }
        if (buttonkey.keyCode == BUTTON.DOWN) {
            bomber.directionY = DIRECTION.DOWN;
        }
    });

    document.addEventListener("keyup", (buttonkey) => {
        if (buttonkey.keyCode == BUTTON.LEFT) {
            bomber.directionX = DIRECTION.NONE;
        }
        if (buttonkey.keyCode == BUTTON.UP) {
            bomber.directionY = DIRECTION.NONE;
        }
        if (buttonkey.keyCode == BUTTON.RIGHT) {
            bomber.directionX = DIRECTION.NONE;
        }
        if (buttonkey.keyCode == BUTTON.DOWN) {
            bomber.directionY = DIRECTION.NONE;
        }
    });

    const futureLeft = bomber.directionX * distance + bomber.x - bomber.radius - 1;
    const futureRight = bomber.directionX * distance + bomber.x + bomber.radius + 1;
    const futureUp = bomber.directionY * distance + bomber.y - bomber.radius - 1;
    const futureDown = bomber.directionY * distance + bomber.y + bomber.radius + 1;

    const isAllowedMove = checkArenaCollision(futureRight, futureLeft, futureDown, futureUp, arena);
    const isCollision = checkBlocksCollision(futureRight, futureLeft, futureDown, futureUp, barriers);

    if (isAllowedMove.x && !isCollision) {
        bomber.x += bomber.directionX * distance;
    }
    if (isAllowedMove.y && !isCollision) {
        bomber.y += bomber.directionY * distance;
    }
}

function checkArenaCollision(xMax, xMin, yMax, yMin, arena) {
    let allowedMove = {};
    allowedMove.x = true;
    allowedMove.y = true;

    if (xMin < 0 || xMax > arena.arenaWidth) {
        allowedMove.x = false;
    }

    if (yMin < 0 || yMax > arena.arenaHeight) {
        allowedMove.y = false;
    }

    return allowedMove;
}

function checkBlocksCollision(right, left, down, up, barriers) {
    let isCollision = false;

    for (const barrier of barriers) {
        if ((!isCollision) && ( isRectContains(right, down, barrier) ||
                                isRectContains(left, down, barrier) ||
                                isRectContains(left, up, barrier) ||
                                isRectContains(right, up, barrier))) {
            isCollision = true;
        }
    }
    return isCollision;
}

function main() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');

    const bomberStartPositionX = 25;
    const bomberStartPositionY = 25;

    let bomber = createBomber(bomberStartPositionX, bomberStartPositionY);
    let arena = createArena();

    const indestructibleBarriers = [];
    for(let y = ARENA_CELL_HEIGHT; y < arena.arenaHeight; y+= ARENA_CELL_HEIGHT * 2) {
        for(let x = ARENA_CELL_WIDTH; x < arena.arenaWidth; x += ARENA_CELL_WIDTH * 2) {
            indestructibleBarriers.push(createBarriers(x, y));
        }
    }

    redraw(ctx, arena, bomber, indestructibleBarriers);

    let lastTimestamp = Date.now();
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        update(deltaTime, bomber, indestructibleBarriers, arena);
        redraw(ctx, arena, bomber, indestructibleBarriers);
        requestAnimationFrame(animateFn);
    };
    animateFn();
}

main();