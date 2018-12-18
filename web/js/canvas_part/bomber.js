import {Vec2} from './clickHandler.js';

const NUMBER_OF_BOMBERS = 1;
const BOMBERMAN_RADIUS = 22;
const BOMBERMAN_SPEED = new Vec2(200, 200);
const BOMBER_START_ANGLE = 0;
const BOMBER_END_ANGLE = Math.PI * 2;
const BOMBERMAN_COLOR = '#999';
const NUMBERS_OF_BOMBS = 3;
const BOMBERMAN_START_POSITION_X = 25;
const BOMBERMAN_START_POSITION_Y = 25;

function Bomber(bomberPosition, bomberSpeed, bomberRadius, bomberColor, bomberStartAngle, bomberEndAngle, numberOfBombs, serialNumber, status) {
    this.radius = bomberRadius;
    this.speed = bomberSpeed;
    this.bomberColor = bomberColor;
    this.radiusStart = bomberStartAngle;
    this.radiusEnd = bomberEndAngle;
    this.position = bomberPosition;
    this.numberOfBombs = numberOfBombs;
    this.number = serialNumber;
    this.status = status;
}

function createBomber(position, number) {
    const bomberPosition = position;
    const bomberSpeed = BOMBERMAN_SPEED;
    const bomberRadius = BOMBERMAN_RADIUS;
    const bomberColor = BOMBERMAN_COLOR;
    const bomberStartAngle = BOMBER_START_ANGLE;
    const bomberEndAngle = BOMBER_END_ANGLE;
    const numberOfBombs = NUMBERS_OF_BOMBS;
    const serialNumber = number;
    const status = 'alive';

    return new Bomber(
        bomberPosition,
        bomberSpeed,
        bomberRadius,
        bomberColor,
        bomberStartAngle,
        bomberEndAngle,
        numberOfBombs,
        serialNumber,
        status
    );
}

function getBombers() {
    const position = new Vec2(BOMBERMAN_START_POSITION_X, BOMBERMAN_START_POSITION_Y);

    const bombers = [];
    for (let i = 1; i <= NUMBER_OF_BOMBERS; i++) {
        bombers.push(createBomber(position, i));
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
    }
}

export {
    BOMBERMAN_RADIUS,
    clearStartPosition,
    getBombers,
    deleteBomber,
};
