import {createBomber, BOMBERMAN_1, BOMBERMAN_2, BOMBERMAN_3, BOMBERMAN_4, NUMBER_OF_BOMBERMANS} from "./gameObjects.js";

function initStartParameters() {
    const bombersParameters = [];
    bombersParameters.push(BOMBERMAN_1, BOMBERMAN_2, BOMBERMAN_3, BOMBERMAN_4);
    return bombersParameters;
}

function getBombers() {
    const startParameters = initStartParameters();
    const bombers = [];
    for (let i = 0; i < NUMBER_OF_BOMBERMANS; i++) {
        bombers.push(createBomber(startParameters[i]));
    }
    return bombers;
}

function deleteBomber(bombers, bomber) {
    bombers.splice(bombers.indexOf(bomber), 1);
}

function clearStartPosition(bombers, place) {
    for (const bomber of bombers) {
        if (bomber.id == 1) {
            place.free(0, 0);
            place.free(0, 1);
            place.free(1, 0);
        }
        if (bomber.id == 2) {
            place.free(13, 10);
            place.free(14, 9);
            place.free(14, 10);
        }
        if (bomber.id == 3) {
            place.free(0, 9);
            place.free(0, 10);
            place.free(1, 10);
        }
        if (bomber.id == 4) {
            place.free(13, 0);
            place.free(14, 0);
            place.free(14, 1);
        }
    }
}

export {
    getBombers,
    clearStartPosition,
    deleteBomber,
};
