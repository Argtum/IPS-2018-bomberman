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
    'color': '#89111D',
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
const ARENA_BACKGROUND_COLOR = '#C0C0C0';

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
const BARRIER_IMG = {
    'x': 70,
    'y': 174,
    'width': 17,
    'height': 17,
};

const BLOCK_IMG = {
    'x': 87,
    'y': 174,
    'width': 17,
    'height': 17,
};

function Block(barrierPosition, barrierWidth, barrierHeight, picture) {
    this.position = barrierPosition;
    this.width = barrierWidth;
    this.height = barrierHeight;
    this.imgStartX = picture.x;
    this.imgStartY = picture.y;
    this.imgWidth = picture.width;
    this.imgHeight = picture.height;
}

function createBarriers(position, img) {
    const barrierPosition = position;
    const barrierWidth = BARRIER_WIDTH;
    const barrierHeight = BARRIER_HEIGHT;
    const picture = img;

    return new Block(
        barrierPosition,
        barrierWidth,
        barrierHeight,
        picture
    );
}

//BOMBS
const BOMB_RADIUS = 22;
const BOMB_IMG = [{
    'x': 49,
    'y': 255,
    'width': 17,
    'height': 17,
}, {
    'x': 33,
    'y': 257,
    'width': 15,
    'height': 15,
}, {
    'x': 19,
    'y': 259,
    'width': 13,
    'height': 13,
}];

const BOMB_LIFETIME = 3; //в милисекундах
const FIRE_SIZE = 3;
const FIRE_IMG = {
    'x': 517,
    'y': 289,
    'width': 17,
    'height': 17,
};
const EXPLOSION_TIME = 0.5; //в милисекундах
const BOMB_ANIMATION_TIME = 20;

function Bomb(bombPosition, radius, fireRadius, lifeTime, explosionTime, whoseBomb, allowedCollision, img, imgIndex,
              animationTime, animationWay) {
    this.position = bombPosition;
    this.radius = radius;
    this.fireRadius = fireRadius;
    this.lifeTime = lifeTime;
    this.explosionTime = explosionTime;
    this.whoseBomb = whoseBomb;
    this.allowedCollision = allowedCollision;
    this.img = img;
    this.imgIndex = imgIndex;
    this.animationTime = animationTime;
    this.animationWay = animationWay;
}

function createBomb(position, lt, bomberId) {
    const bombPosition = position;
    const bombRadius = BOMB_RADIUS;
    const fireRadius = FIRE_SIZE;
    const lifeTime = lt;
    const explosionTime = EXPLOSION_TIME;
    const whoseBomb = bomberId;
    const allowedCollision = false;
    const img = BOMB_IMG;
    const imgIndex = 0;
    const animationTime = BOMB_ANIMATION_TIME;
    const animationWay = 'down';

    return new Bomb(
        bombPosition,
        bombRadius,
        fireRadius,
        lifeTime,
        explosionTime,
        whoseBomb,
        allowedCollision,
        img,
        imgIndex,
        animationTime,
        animationWay
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
    BLOCK_IMG,
    BARRIER_IMG,
    FIRE_IMG,
    EXPLOSION_TIME,
    BOMBERMAN_1,
    BOMBERMAN_2,
    BOMBERMAN_3,
    BOMBERMAN_4,
    NUMBER_OF_BOMBERMANS,
    BOMB_LIFETIME,
    BOMB_IMG,
    BOMB_RADIUS,
    BOMB_ANIMATION_TIME,
    BARRIER_WIDTH,
    BARRIER_HEIGHT
};