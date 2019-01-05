import {Vec2} from './clickHandler.js';

const NUMBER_OF_BOMBERMANS = 2;
const BOMBERMAN_RADIUS = 22;
const BOMBERMAN_SPEED = new Vec2(200, 200);
const BOMBERMAN_START_ANGLE = 0;
const BOMBERMAN_END_ANGLE = Math.PI * 2;
const NUMBERS_OF_BOMBS = 3;

const BOMBERMAN_1 = {
    'id': 1,
    'position': new Vec2(25, 25),
    'color': '#126396',
    'keyCode': {
        DROP: 32,   //SPACE
        LEFT: 65,   //A
        UP: 87,     //W
        RIGHT: 68,  //D
        DOWN: 83,   //S
    },
};

const BOMBERMAN_2 = {
    'id': 2,
    'position': new Vec2(725, 525),
    'color': '#89111d',
    'keyCode': {
        DROP: 13,   //RIGHT_CTRL
        LEFT: 37,   //LEFT_ARROW
        UP: 38,     //UP_ARROW
        RIGHT: 39,  //RIGHT_ARROW
        DOWN: 40,   //DOWN_ARROW
    },
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

function Bomber(bomberPosition, bomberSpeed, bomberRadius, bomberColor, bomberStartAngle, bomberEndAngle, numberOfBombs,
    id, status, keyCode) {
    this.radius = bomberRadius;
    this.speed = bomberSpeed;
    this.bomberColor = bomberColor;
    this.radiusStart = bomberStartAngle;
    this.radiusEnd = bomberEndAngle;
    this.position = bomberPosition;
    this.numberOfBombs = numberOfBombs;
    this.id = id;
    this.status = status;
    this.keyCode = keyCode;

    this._map = {};

    this.onKeyDown = function(keyCode) {
        this._map[keyCode] = true;
    };

    this.onKeyUp = function(keyCode) {
        delete this._map[keyCode];
    };

    this.isPressed = function(keyCode) {
        return Boolean(this._map[keyCode]);
    };
}

function createBomber(bombermanData) {
    const bomberPosition = bombermanData.position;
    const bomberSpeed = BOMBERMAN_SPEED;
    const bomberRadius = BOMBERMAN_RADIUS;
    const bomberColor = bombermanData.color;
    const bomberStartAngle = BOMBERMAN_START_ANGLE;
    const bomberEndAngle = BOMBERMAN_END_ANGLE;
    const numberOfBombs = NUMBERS_OF_BOMBS;
    const id = bombermanData.id;
    const status = 'alive';
    const keyCode = bombermanData.keyCode;

    return new Bomber(
        bomberPosition,
        bomberSpeed,
        bomberRadius,
        bomberColor,
        bomberStartAngle,
        bomberEndAngle,
        numberOfBombs,
        id,
        status,
        keyCode
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
    clearStartPosition,
    getBombers,
    deleteBomber,
};
