import {Vec2} from "./clickHandler.js";

//BOMBERS
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

//ARENA
const ARENA_START_POINT_X = 0;
const ARENA_START_POINT_Y = 0;
const ARENA_CELL = 50;
const NUMBER_OF_CELL_X = 15;
const NUMBER_OF_CELL_Y = 11;
const ARENA_BACKGROUND_COLOR = '#CCC';

function Arena(arenaStartX, arenaStartY, arenaWidth, arenaHeight, backgroundColor) {
    this.startX = arenaStartX;
    this.startY = arenaStartY;
    this.arenaWidth = arenaWidth;
    this.arenaHeight = arenaHeight;
    this.backgroundColor = backgroundColor;
}

function createArena() {
    const arenaStartX = ARENA_START_POINT_X;
    const arenaStartY = ARENA_START_POINT_Y;
    const arenaWidth = ARENA_CELL * NUMBER_OF_CELL_X;
    const arenaHeight = ARENA_CELL * NUMBER_OF_CELL_Y;
    const backgroundColor = ARENA_BACKGROUND_COLOR;

    return new Arena(
        arenaStartX,
        arenaStartY,
        arenaWidth,
        arenaHeight,
        backgroundColor
    );
}

//BLOCKS
const BARRIER_WIDTH = 44;
const BARRIER_HEIGHT = 44;
const BARRIER_COLOR = '#555';
const BLOCK_COLOR = '#4286f4';

function Block(barrierPosition, barrierWidth, barrierHeight, barrierColor) {
    this.position = barrierPosition;
    this.width = barrierWidth;
    this.height = barrierHeight;
    this.barrierColor = barrierColor;
}

function createBarriers(position, color) {
    const barrierPosition = position;
    const barrierWidth = BARRIER_WIDTH;
    const barrierHeight = BARRIER_HEIGHT;
    const barrierColor = color;

    return new Block(
        barrierPosition,
        barrierWidth,
        barrierHeight,
        barrierColor
    );
}

//BOMBS
const BOMB_RADIUS = 22;
const BOMB_START_ANGLE = 0;
const BOMB_END_ANGLE = Math.PI * 2;
const BOMB_COLOR = '#222';
const BOMB_LIFETIME = 3; //в милисекундах
const FIRE_SIZE = 3;
const FIRE_COLOR = '#FF0000';
const EXPLOSION_TIME = 0.5; //в милисекундах

function Bomb(bombPosition, radius, radiusStart, radiusEnd, bombColor, fireRadius, lifeTime, explosionTime, whoseBomb,
              allowedCollision) {
    this.position = bombPosition;
    this.radius = radius;
    this.radiusStart = radiusStart;
    this.radiusEnd = radiusEnd;
    this.color = bombColor;
    this.fireRadius = fireRadius;
    this.lifeTime = lifeTime;
    this.explosionTime = explosionTime;
    this.whoseBomb = whoseBomb;
    this.allowedCollision = allowedCollision;
}

function createBomb(position, lt, bomberId, color) {
    const bombPosition = position;
    const bombRadius = BOMB_RADIUS;
    const bombStartAngle = BOMB_START_ANGLE;
    const bombEndAngle = BOMB_END_ANGLE;
    const bombColor = color;
    const fireRadius = FIRE_SIZE;
    const lifeTime = lt;
    const explosionTime = EXPLOSION_TIME;
    const whoseBomb = bomberId;
    const allowedCollision = false;

    return new Bomb(
        bombPosition,
        bombRadius,
        bombStartAngle,
        bombEndAngle,
        bombColor,
        fireRadius,
        lifeTime,
        explosionTime,
        whoseBomb,
        allowedCollision
    );
}

export {
    createBomber,
    createArena,
    createBarriers,
    createBomb,
    ARENA_CELL,
    NUMBER_OF_CELL_X,
    NUMBER_OF_CELL_Y,
    BLOCK_COLOR,
    BARRIER_COLOR,
    FIRE_COLOR,
    EXPLOSION_TIME,
    BOMBERMAN_1,
    BOMBERMAN_2,
    BOMBERMAN_3,
    BOMBERMAN_4,
    NUMBER_OF_BOMBERMANS,
    BOMB_LIFETIME,
    BOMB_COLOR,
    BOMB_RADIUS
};