import {getBombers, deleteBomber, clearStartPosition} from './canvas_part/bomber.js';
import {ARENA_CELL, ArenaPlaces, createArena} from './canvas_part/arena.js';
import {createBarriers, BLOCK_COLOR, BARRIER_COLOR} from './canvas_part/block.js';
import {trackLifeTime} from './canvas_part/bomb.js';
import {Vec2, ClickHandler, handlerForBomber, handlerForBomb} from './canvas_part/clickHandler.js';
import {redraw} from './canvas_part/render.js';
import {collisionsProcessing} from './canvas_part/collision.js';

function update(dt, bombers, arena, keyMap, place) {
    trackLifeTime(place, bombers, dt);
    for (const bomber of bombers) {
        const directionForce = handlerForBomber(bomber, keyMap);
        const moveDistance = bomber.speed.multiplyScalar(dt).multiply(directionForce);

        const collisionsResult = collisionsProcessing(bomber, arena, moveDistance, place);
        if (collisionsResult['died']) {
            deleteBomber(bombers, bomber);
        } else {
            bomber.position = bomber.position.add(collisionsResult['distance']);
            handlerForBomb(keyMap, bomber, place);
        }
    }
}

function main() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');

    const bombers = getBombers();
    const arena = createArena();
    const place = new ArenaPlaces();
    place.clearMap();

    for (let y = ARENA_CELL; y < arena.arenaHeight; y += ARENA_CELL * 2) {
        for (let x = ARENA_CELL; x < arena.arenaWidth; x += ARENA_CELL * 2) {
            const barrierPosition = new Vec2(x, y);
            place.takePlace(createBarriers(barrierPosition, BARRIER_COLOR), 'barrier');
        }
    }

    for (let y = 0; y < arena.arenaHeight; y += ARENA_CELL) {
        for (let x = 0; x < arena.arenaWidth; x += ARENA_CELL) {
            const xPosition = Math.floor(x / ARENA_CELL);
            const yPosition = Math.floor(y / ARENA_CELL);
            if (place.whatType(xPosition, yPosition) == 'empty') {
                const barrierPosition = new Vec2(x, y);
                place.takePlace(createBarriers(barrierPosition, BLOCK_COLOR), 'block');
            }
        }
    }

    clearStartPosition(bombers, place);
    const keyMap = new ClickHandler();

    document.addEventListener('keydown', (event) => {
        keyMap.onKeyDown(event.keyCode);
    });

    document.addEventListener('keyup', (event) => {
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
