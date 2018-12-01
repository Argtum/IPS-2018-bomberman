import {Vec2, BOMBERMAN_START_POSITION_X, BOMBERMAN_START_POSITION_Y, processKeyMapForBomber, createBomber} from "./canvas_part/bomber.canvas.js";
import {ARENA_CELL, ArenaPlaces, createArena} from "./canvas_part/arena.canvas.js";
import {createBarriers} from "./canvas_part/barrier.canvas.js";
import {processKeyMapForBomb, ticTak} from "./canvas_part/bomb.canvas.js";
import {KeymapCanvas} from "./canvas_part/keymap.canvas.js";
import {redraw} from "./canvas_part/draw.canvas.js";
import {collisionsProcessing} from "./canvas_part/collisions.canvas.js";

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