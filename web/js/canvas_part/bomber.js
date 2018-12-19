import {Vec2} from './clickHandler.js';

const NUMBER_OF_BOMBERMANS = 1;
const BOMBERMAN_RADIUS = 22;
const BOMBERMAN_SPEED = new Vec2(200, 200);
const BOMBERMAN_START_ANGLE = 0;
const BOMBERMAN_END_ANGLE = Math.PI * 2;
const NUMBERS_OF_BOMBS = 3;

const BOMBERMAN_1 = {
    'id': 1,
    'position': new Vec2(25, 25),
    'color': '#126396',
};

const BOMBERMAN_2 = {
    'id': 2,
    'position': new Vec2(725, 525),
    'color': '#89111d',
};

const BOMBERMAN_3 = {
    'id': 3,
    'position': new Vec2(25, 525),
    'color': '#118417',
};

const BOMBERMAN_4 = {
    'id': 4,
    'position': new Vec2(725, 25),
    'color': '#E5E106',
};

function Bomber(bomberPosition, bomberSpeed, bomberRadius, bomberColor, bomberStartAngle, bomberEndAngle, numberOfBombs, id, status) {
    this.radius = bomberRadius;
    this.speed = bomberSpeed;
    this.bomberColor = bomberColor;
    this.radiusStart = bomberStartAngle;
    this.radiusEnd = bomberEndAngle;
    this.position = bomberPosition;
    this.numberOfBombs = numberOfBombs;
    this.id = id;
    this.status = status;
}

function createBomber(position, number, color) {
    const bomberPosition = position;
    const bomberSpeed = BOMBERMAN_SPEED;
    const bomberRadius = BOMBERMAN_RADIUS;
    const bomberColor = color;
    const bomberStartAngle = BOMBERMAN_START_ANGLE;
    const bomberEndAngle = BOMBERMAN_END_ANGLE;
    const numberOfBombs = NUMBERS_OF_BOMBS;
    const id = number;
    const status = 'alive';

    return new Bomber(
        bomberPosition,
        bomberSpeed,
        bomberRadius,
        bomberColor,
        bomberStartAngle,
        bomberEndAngle,
        numberOfBombs,
        id,
        status
    );
}

function initStartParameters() {
    const bombersParameters = [];
    bombersParameters.push(BOMBERMAN_1, BOMBERMAN_2, BOMBERMAN_3, BOMBERMAN_4);
    return bombersParameters;
}

function getBombers() {
    const startParameters = initStartParameters();
    const bombers = [];
    for (let i = 0; i < NUMBER_OF_BOMBERMANS; i++) {
        bombers.push(createBomber(startParameters[i]['position'], startParameters[i]['id'], startParameters[i]['color']));
    }
    return bombers;
}

function deleteBomber(bombers, bomber) {
    bombers.splice(bombers.indexOf(bomber), 1);
}

function clearStartPosition(bombers, place) {
    for (const bomber of bombers) {
        if (bomber.number = 1) {
            place.free(0, 0);
            place.free(0, 1);
            place.free(1, 0);
        }
        if (bomber.number = 2) {
            place.free(13, 10);
            place.free(14, 9);
            place.free(14, 10);
        }
        if (bomber.number = 3) {
            place.free(0, 9);
            place.free(0, 10);
            place.free(1, 10);
        }
        if (bomber.number = 4) {
            place.free(13, 0);
            place.free(14, 0);
            place.free(14, 1);
        }
    }
}

export {
    BOMBERMAN_RADIUS,
    clearStartPosition,
    getBombers,
    deleteBomber,
};
