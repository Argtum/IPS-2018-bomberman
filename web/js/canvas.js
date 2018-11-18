import {Vec2, Direction, createBomber} from "./canvas_part/bomber.canvas.js";
import {ARENA_CELL, createArena} from "./canvas_part/arena.canvas.js";
import {createBarriers} from "./canvas_part/barrier.canvas.js";
import {FIRE_COLOR, BOMB_LIFETIME, EXPLOSION_TIME, createBomb} from "./canvas_part/bomb.canvas.js";
import {KeyCode, KeymapCanvas} from "./canvas_part/keymap.canvas.js";
import {redraw} from "./canvas_part/draw.canvas.js";
import {collisionsProcessing} from "./canvas_part/collisions.canvas.js";

function update(dt, bombers, barriers, arena, keyMap, bombs, allowedPlacesForBomb)
{
    for (const bomber of bombers) {
        const directionForce = processKeyMapForBomber(bomber, keyMap);
        const moveDistance = bomber.speed.multiplyScalar(dt).multiply(directionForce);

        bomber.position = bomber.position.add(collisionsProcessing(bomber, barriers, arena, moveDistance));
        processKeyMapForBomb(bombs, keyMap, allowedPlacesForBomb, bomber);
    }

    if (bombs) {
        for (let i = 0; i < bombs.length; i++) {
            bombs[i].lifeTime -= dt;
            if (bombs[i].lifeTime <= 0) {
                bombs.splice(i, 1);
            }
        }
    }

    if (bombs) {
        for (const bomb of bombs) {
            if (bomb.lifeTime <= EXPLOSION_TIME) {
                bomb.color = FIRE_COLOR;
            }
        }
    }
}

function processKeyMapForBomb(bombs, keyMap, allowedPlacesForBomb, bomber)
{
    if (keyMap.isPressed(KeyCode.SPACE)) {
        const bombPosition = searchPlace(allowedPlacesForBomb, bomber);
        let isUniqueBomb = true;
        if (bombs) {
            for (const bomb of bombs) {
                if (isUniqueBomb && bomb.position == bombPosition) {
                    isUniqueBomb = false;
                }
            }
        }

        if (isUniqueBomb) {
            bombs.push(createBomb(bombPosition, BOMB_LIFETIME));
        }
    }
}

function processKeyMapForBomber(bomber, keyMap)
{
    let directionForce = Vec2.ZERO;
    if (keyMap.isPressed(KeyCode.LEFT_ARROW)) {
        directionForce = directionForce.add(Direction.LEFT);
    }
    if (keyMap.isPressed(KeyCode.RIGHT_ARROW)) {
        directionForce = directionForce.add(Direction.RIGHT);
    }
    if (keyMap.isPressed(KeyCode.UP_ARROW)) {
        directionForce = directionForce.add(Direction.UP);
    }
    if (keyMap.isPressed(KeyCode.DOWN_ARROW)) {
        directionForce = directionForce.add(Direction.DOWN);
    }
    return directionForce;
}

function searchPlace(allowedPlacesForBomb, bomber)
{
    for (const allowedPlace of allowedPlacesForBomb)
    {
        if (Math.abs(allowedPlace.x - bomber.position.x) <= 25 && Math.abs(allowedPlace.y - bomber.position.y) <= 25) {
            return allowedPlace;
        }
    }
}

function main() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');

    const bomberStartPositionX = 25;
    const bomberStartPositionY = 25;

    const position = new Vec2(bomberStartPositionX, bomberStartPositionY);
    const numberOfBomber = 1;

    const bombers = [];
    for (let i = 1; i <= numberOfBomber; i++) {
        bombers.push(createBomber(position, i));
    }

    const arena = createArena();

    const barriers = [];
    for(let y = ARENA_CELL; y < arena.arenaHeight; y += ARENA_CELL * 2) {
        for(let x = ARENA_CELL; x < arena.arenaWidth; x += ARENA_CELL * 2) {
            barriers.push(createBarriers(x, y));
        }
    }

    const allowedPlacesForBomb = [];
    for(let y = ARENA_CELL / 2; y < arena.arenaHeight; y += ARENA_CELL) {
        for(let x = ARENA_CELL / 2; x < arena.arenaWidth; x += ARENA_CELL) {
            allowedPlacesForBomb.push(new Vec2(x, y));
        }
    }

    const keyMap = new KeymapCanvas();

    document.addEventListener("keydown", (event) => {
        keyMap.onKeyDown(event.keyCode);
    });

    document.addEventListener("keyup", (event) => {
        keyMap.onKeyUp(event.keyCode);
    });

    let bombs = [];

    redraw(ctx, arena, bombers, barriers, bombs);

    let lastTimestamp = Date.now();
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        update(deltaTime, bombers, barriers, arena, keyMap, bombs, allowedPlacesForBomb);
        redraw(ctx, arena, bombers, barriers, bombs);
        requestAnimationFrame(animateFn);
    };
    animateFn();
}

main();