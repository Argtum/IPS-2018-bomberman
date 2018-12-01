import {Vec2, BOMBERMAN_START_POSITION_X, BOMBERMAN_START_POSITION_Y, Direction, createBomber} from "./canvas_part/bomber.canvas.js";
import {NUMBER_OF_CELL_X, NUMBER_OF_CELL_Y, ARENA_CELL, createArena} from "./canvas_part/arena.canvas.js";
import {createBarriers} from "./canvas_part/barrier.canvas.js";
import {BOMB_LIFETIME, ticTak, createBomb} from "./canvas_part/bomb.canvas.js";
import {keyCode, KeymapCanvas} from "./canvas_part/keymap.canvas.js";
import {redraw} from "./canvas_part/draw.canvas.js";
import {collisionsProcessing} from "./canvas_part/collisions.canvas.js";
import {ArenaPlaces} from "./canvas_part/arenaMap.canvas.js";

function update(dt, bombers, arena, keyMap, place)
{
    for (const bomber of bombers) {
        const directionForce = processKeyMapForBomber(bomber, keyMap);
        const moveDistance = bomber.speed.multiplyScalar(dt).multiply(directionForce);

        bomber.position = bomber.position.add(collisionsProcessing(bomber, arena, moveDistance, place));
        processKeyMapForBomb(keyMap, bomber, place);
    }
    ticTak(place, dt);
}

function getCurrentPosition(bomber) {
    const xPosition = Math.ceil(bomber.position.x / ARENA_CELL);
    const yPosition = Math.ceil(bomber.position.y / ARENA_CELL);

    return new Vec2(xPosition * ARENA_CELL - ARENA_CELL / 2, yPosition * ARENA_CELL - ARENA_CELL / 2);
}

function processKeyMapForBomb(keyMap, bomber, place)
{
    if (keyMap.isPressed(keyCode.SPACE)) {
        for (let j = 0; j < NUMBER_OF_CELL_Y; j++) {
            for(let i = 0; i < NUMBER_OF_CELL_X; i++) {
                if (place.whatType(i, j) == "empty") {
                    place.takePlace(createBomb(getCurrentPosition(bomber), BOMB_LIFETIME, bomber.whoseBomb), 'bomb');
                }
            }
        }
    }
}

function processKeyMapForBomber(bomber, keyMap)
{
    let directionForce = Vec2.ZERO;
    if (keyMap.isPressed(keyCode.LEFT_ARROW)) {
        directionForce = directionForce.add(Direction.LEFT);
    }
    if (keyMap.isPressed(keyCode.RIGHT_ARROW)) {
        directionForce = directionForce.add(Direction.RIGHT);
    }
    if (keyMap.isPressed(keyCode.UP_ARROW)) {
        directionForce = directionForce.add(Direction.UP);
    }
    if (keyMap.isPressed(keyCode.DOWN_ARROW)) {
        directionForce = directionForce.add(Direction.DOWN);
    }
    return directionForce;
}

function main() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');

    const bomberStartPositionX = BOMBERMAN_START_POSITION_X;
    const bomberStartPositionY = BOMBERMAN_START_POSITION_Y;

    const position = new Vec2(bomberStartPositionX, bomberStartPositionY);
    const numberOfBomber = 1;

    const bombers = [];
    for (let i = 1; i <= numberOfBomber; i++) {
        bombers.push(createBomber(position, i));
    }

    const arena = createArena();
    const place = new ArenaPlaces();

    for(let y = ARENA_CELL; y < arena.arenaHeight; y += ARENA_CELL * 2) {
        for(let x = ARENA_CELL; x < arena.arenaWidth; x += ARENA_CELL * 2) {
            const barrierPosition = new Vec2(x, y);
            place.takePlace(createBarriers(barrierPosition), 'barrier');
        }
    }

    const keyMap = new KeymapCanvas();

    document.addEventListener("keydown", (event) => {
        keyMap.onKeyDown(event.keyCode);
    });

    document.addEventListener("keyup", (event) => {
        keyMap.onKeyUp(event.keyCode);
    });

    redraw(ctx, arena, bombers, place);

    let lastTimestamp = Date.now();
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        update(deltaTime, bombers, arena, keyMap, place);
        redraw(ctx, arena, bombers, place);
        requestAnimationFrame(animateFn);
    };
    animateFn();
}

main();