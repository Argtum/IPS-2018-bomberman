import {getBombers, deleteBomber, clearStartPosition} from './canvas_part/bomber.js';
import {
    createArena,
    NUMBER_OF_CELL_X,
    NUMBER_OF_CELL_Y,
    BOMB_ANIMATION_TIME,
    BOMBERMAN_ANIMATION_TIME
} from './canvas_part/gameObjects.js';
import {trackLifeTime} from './canvas_part/bomb.js';
import {handlerForBomber, handlerForBomb, clickHandler} from './canvas_part/clickHandler.js';
import {redraw} from './canvas_part/render.js';
import {collisionsProcessing} from './canvas_part/collision.js';
import {ArenaPlaces} from "./canvas_part/arenaMap.js";
import {getUnbreakableBlocks, getBreakableBlocks} from "./canvas_part/blocks.js";

function update(dt, bombers, arena, place) {
    trackLifeTime(place, bombers, dt);
    animation(dt, place, bombers);

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

function animateBomb(dt, bomb) {
    bomb.animationTime--;
    if (bomb.animationTime == 0) {
        if (bomb.imgIndex == 0 || bomb.imgIndex == 2) {
            bomb.imgIndex = 1;
        } else if (bomb.animationWay == 'down') {
            bomb.imgIndex = 2;
            bomb.animationWay = 'up';
        } else {
            bomb.imgIndex = 0;
            bomb.animationWay = 'down';
        }
        bomb.animationTime = BOMB_ANIMATION_TIME;
    }
}

function animateBomber(dt, bomber) {
    if (bomber.keyCode != bomber.lastKeyCode) {
        bomber.animationTime = BOMBERMAN_ANIMATION_TIME;
    }
    if (bomber.isPressed(bomber.keyCode.LEFT) ||
        bomber.isPressed(bomber.keyCode.RIGHT) ||
        bomber.isPressed(bomber.keyCode.UP) ||
        bomber.isPressed(bomber.keyCode.DOWN)) {
        bomber.animationTime--;
    }
    if (bomber.animationTime == 0) {
        if (bomber.animationType == '1' || bomber.animationType == '3') {
            bomber.animationType = '2'
        } else if (bomber.animationWay == 'down') {
            bomber.animationType = '3';
            bomber.animationWay = 'up';
        } else {
            bomber.animationType = '1';
            bomber.animationWay = 'down';
        }
        bomber.animationTime = BOMBERMAN_ANIMATION_TIME;
    }
}

function animation(dt, place, bombers) {
    for (let j = 0; j < NUMBER_OF_CELL_Y; j++) {
        for (let i = 0; i < NUMBER_OF_CELL_X; i++) {
            const currentPlaceType = place.whatType(i, j);
            if (currentPlaceType == 'bomb') {
                animateBomb(dt, place.getObj(i, j));
            }
            for (const bomber of bombers) {
                animateBomber(dt, bomber);
            }
        }
    }
}

function gameObjectInitializer() {
    const bombers = getBombers();
    const arena = createArena();
    const place = new ArenaPlaces();
    place.clearMap();
    getUnbreakableBlocks(place, arena);
    getBreakableBlocks(place, arena);

    return {bombers, arena, place}
}

// function sendData(bombers, place, socket) {
//     const data = {
//         'bombers': bombers,
//         'place': place
//     };
//     socket.send(JSON.stringify(data));
// }
//
// function getData() {
//     socket.onmessage = function(event) {
//         return event.data;
//     };
// }

function game() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const gameEntities = gameObjectInitializer();
    const ctx = canvas.getContext('2d');
    let bombers = gameEntities.bombers;
    const arena = gameEntities.arena;
    let place = gameEntities.place;

    clearStartPosition(bombers, place);
    clickHandler(bombers);

    redraw(ctx, arena, bombers, place);
    let lastTimestamp = Date.now();
    const gameTick = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        //const data = getData();
        //bombers = data.bombers;
        //place = data.place;
        update(deltaTime, bombers, arena, place);
        redraw(ctx, arena, bombers, place);
        requestAnimationFrame(gameTick);
        //sendData(bombers, place, socket);
    };
    gameTick();
}

// function waitingRoom() {
//     socket.onmessage = function(event) {
//         if (event.status == 'start') {
//             game(socket);
//         }
//     };
// }
//
// waitingRoom();

game();