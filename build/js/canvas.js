import {
    BOMBERMAN_RADIUS,
    BOMBERMAN_SPEED,
    CIRCLE_START_ANGLE,
    CIRCLE_END_ANGLE,
    BOMBERMAN_COLOR,
    BOMBERMAN_DIRECTION_X,
    BOMBERMAN_DIRECTION_Y,
    Bomber,
} from "./canvas_part/bomber.js";

import {
    ARENA_START_POINT_X,
    ARENA_START_POINT_Y,
    ARENA_CELL_WIDTH,
    ARENA_CELL_HEIGHT,
    NUMBER_OF_CELL_X,
    NUMBER_OF_CELL_Y,
    ARENA_BACKGROUND_COLOR,
    Arena,
} from "./canvas_part/arena.js";

import {
    BARRIER_WIDTH,
    BARRIER_HEIGHT,
    BARRIER_COLOR,
    BARRIER_CORRECTION,
    Barrier,
} from "./canvas_part/barrier.js";

const BOMB_COLOR = '#FFF';

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
    DOWN: 1
};

function DrawBattleArena(ctx, arena) {
    ctx.fillStyle = arena.backgroundColor;
    ctx.fillRect(arena.startX, arena.startY, arena.arenaWidth, arena.arenaHeight);
}

function DrawBarrier(ctx, barrier) {
    ctx.fillStyle = barrier.barrierColor;
    ctx.fillRect(barrier.startX, barrier.startY, barrier.width, barrier.height);
}

function Bomb(positionX, positionY, radius, radiusStart, radiusEnd) {
    this.x = positionX;
    this.y = positionY;
    this.radius = radius;
    this.radiusStart = radiusStart;
    this.radiusEnd = radiusEnd;
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

function update(dt, bomber, barriers) {
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
            bomber.directionX = BOMBERMAN_DIRECTION_X;
        }
        if (buttonkey.keyCode == BUTTON.UP) {
            bomber.directionY = BOMBERMAN_DIRECTION_Y;
        }
        if (buttonkey.keyCode == BUTTON.RIGHT) {
            bomber.directionX = BOMBERMAN_DIRECTION_X;
        }
        if (buttonkey.keyCode == BUTTON.DOWN) {
            bomber.directionY = BOMBERMAN_DIRECTION_Y;
        }
    });

    const futureLeft = bomber.directionX * distance + bomber.x - bomber.radius - 1;
    const futureRight = bomber.directionX * distance + bomber.x + bomber.radius + 1;
    const futureUp = bomber.directionY * distance + bomber.y - bomber.radius - 1;
    const futureDown = bomber.directionY * distance + bomber.y + bomber.radius + 1;

    const isAllowedMove = checkArenaCollision(futureRight, futureLeft, futureDown, futureUp);
    const isCollision = checkBlocksCollision(futureRight, futureLeft, futureDown, futureUp, barriers);

    if (isAllowedMove.x && !isCollision) {
        bomber.x += bomber.directionX * distance;
    }
    if (isAllowedMove.y && !isCollision) {
        bomber.y += bomber.directionY * distance;
    }
}

function createBarriers(startPositionX, startPositionY) {
    const barrierStartX = BARRIER_CORRECTION + startPositionX;
    const barrierStartY = BARRIER_CORRECTION + startPositionY;
    const barrierWidth = BARRIER_WIDTH;
    const barrierHeight = BARRIER_HEIGHT;
    const barrierColor = BARRIER_COLOR;

    return new Barrier (
        barrierStartX,
        barrierStartY,
        barrierWidth,
        barrierHeight,
        barrierColor
    );
}

function checkArenaCollision(xMax, xMin, yMax, yMin) {
    let allowedMove = {};
    allowedMove.x = true;
    allowedMove.y = true;

    if (xMin < 0 || xMax > ARENA_CELL_WIDTH * NUMBER_OF_CELL_X) {
        allowedMove.x = false;
    }

    if (yMin < 0 || yMax > ARENA_CELL_HEIGHT * NUMBER_OF_CELL_Y) {
        allowedMove.y = false;
    }

    return allowedMove;
}

function isRectContains(x, y, barrier) {
    return  (x >= barrier.startX && x <= barrier.startX + barrier.width) &&
            (y >= barrier.startY && y <= barrier.startY + barrier.height)
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

    const arenaWidth = ARENA_CELL_WIDTH * NUMBER_OF_CELL_X;
    const arenaHeight = ARENA_CELL_HEIGHT * NUMBER_OF_CELL_Y;

    let arena = new Arena(
        ARENA_START_POINT_X,
        ARENA_START_POINT_Y,
        arenaWidth,
        arenaHeight,
        ARENA_BACKGROUND_COLOR
    );

    const indestructibleBarriers = [];
    for(let y = ARENA_CELL_HEIGHT; y < arenaHeight; y+= ARENA_CELL_HEIGHT * 2) {
        for(let x = ARENA_CELL_WIDTH; x < arenaWidth; x += ARENA_CELL_WIDTH * 2) {
            indestructibleBarriers.push(createBarriers(x, y));
        }
    }

    const startPositionX = 25;
    const startPositionY = 25;

    let bomber = new Bomber(
        startPositionX,
        startPositionY,
        BOMBERMAN_SPEED,
        BOMBERMAN_RADIUS,
        BOMBERMAN_COLOR,
        CIRCLE_START_ANGLE,
        CIRCLE_END_ANGLE,
        BOMBERMAN_DIRECTION_X,
        BOMBERMAN_DIRECTION_Y
    );

    redraw(ctx, arena, bomber, indestructibleBarriers);

    let lastTimestamp = Date.now();
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        update(deltaTime, bomber, indestructibleBarriers);
        redraw(ctx, arena, bomber, indestructibleBarriers);
        requestAnimationFrame(animateFn);
    };
    animateFn();
}

main();