import {getBombers, deleteBomber, clearStartPosition} from './canvas_part/bomber.js';
import {ArenaPlaces, createArena} from './canvas_part/arena.js';
import {getUnbreakableBlocks, getBreakableBlocks} from './canvas_part/block.js';
import {trackLifeTime} from './canvas_part/bomb.js';
import {handlerForBomber, handlerForBomb, clickHandler} from './canvas_part/clickHandler.js';
import {redraw} from './canvas_part/render.js';
import {collisionsProcessing} from './canvas_part/collision.js';

function update(dt, bombers, arena, place) {
    trackLifeTime(place, bombers, dt);
    for (const bomber of bombers) {
        const directionForce = handlerForBomber(bomber);
        const moveDistance = bomber.speed.multiplyScalar(dt).multiply(directionForce);

        const collisionsResult = collisionsProcessing(bomber, arena, moveDistance, place);
        if (collisionsResult['died']) {
            deleteBomber(bombers, bomber);
        } else {
            bomber.position = bomber.position.add(collisionsResult['distance']);
            handlerForBomb(bomber, place);
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
    getUnbreakableBlocks(place, arena);
    getBreakableBlocks(place, arena);
    clearStartPosition(bombers, place);
    // const keyMap = new ClickHandler();
    clickHandler(bombers);
    redraw(ctx, arena, bombers, place);

    let lastTimestamp = Date.now();
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        update(deltaTime, bombers, arena, place);
        redraw(ctx, arena, bombers, place);
        requestAnimationFrame(animateFn);
    };
    animateFn();
}

main();
