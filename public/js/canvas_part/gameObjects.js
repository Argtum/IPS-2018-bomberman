import {Vec2} from "./clickHandler.js";

//BOMBERS
const NUMBER_OF_BOMBERMANS = 2;
const BOMBERMAN_RADIUS = 18;
const BOMBERMAN_SPEED = new Vec2(200, 200);
const BOMBERMAN_START_ANGLE = 0;
const BOMBERMAN_END_ANGLE = Math.PI * 2;
const NUMBERS_OF_BOMBS = 3;
const BOMBERMAN_ANIMATION_TIME = 40;

const BOMBERMAN_1 = {
    'id': 1,
    'position': new Vec2(25, 25),
    'keyCode': {
        DROP: 32,   //SPACE
        LEFT: 65,   //A
        UP: 87,     //W
        RIGHT: 68,  //D
        DOWN: 83,   //S
    },
    'img': {
        'down': {
            '1': {'x': 51, 'y': 39, 'width': 16, 'height': 23},
            '2': {'x': 69, 'y': 39, 'width': 16, 'height': 23},
            '3': {'x': 87, 'y': 39, 'width': 16, 'height': 23}
        },
        'left': {
            '1': {'x': 105, 'y': 39, 'width': 16, 'height': 23},
            '2': {'x': 123, 'y': 39, 'width': 16, 'height': 23},
            '3': {'x': 142, 'y': 39, 'width': 16, 'height': 23}
        },
        'right': {
            '1': {'x': 160, 'y': 39, 'width': 16, 'height': 23},
            '2': {'x': 178, 'y': 39, 'width': 16, 'height': 23},
            '3': {'x': 196, 'y': 39, 'width': 16, 'height': 23}
        },
        'up': {
            '1': {'x': 218, 'y': 39, 'width': 16, 'height': 23},
            '2': {'x': 236, 'y': 39, 'width': 16, 'height': 23},
            '3': {'x': 254, 'y': 39, 'width': 16, 'height': 23}
        }
    }
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
    'img': {
        'down': {
            '1': {'x': 51, 'y': 39, 'width': 16, 'height': 23},
            '2': {'x': 69, 'y': 39, 'width': 16, 'height': 23},
            '3': {'x': 87, 'y': 39, 'width': 16, 'height': 23}
        },
        'left': {
            '1': {'x': 105, 'y': 39, 'width': 16, 'height': 23},
            '2': {'x': 123, 'y': 39, 'width': 16, 'height': 23},
            '3': {'x': 142, 'y': 39, 'width': 16, 'height': 23}
        },
        'right': {
            '1': {'x': 160, 'y': 39, 'width': 16, 'height': 23},
            '2': {'x': 178, 'y': 39, 'width': 16, 'height': 23},
            '3': {'x': 196, 'y': 39, 'width': 16, 'height': 23}
        },
        'up': {
            '1': {'x': 218, 'y': 39, 'width': 16, 'height': 23},
            '2': {'x': 236, 'y': 39, 'width': 16, 'height': 23},
            '3': {'x': 254, 'y': 39, 'width': 16, 'height': 23}
        }
    }
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

function Bomber(
    bomberPosition,
    bomberSpeed,
    bomberRadius,
    bomberColor,
    bomberStartAngle,
    bomberEndAngle,
    numberOfBombs,
    id,
    status,
    keyCode,
    img,
    animationTime,
    animationWay,
    animationType,
    lastKeyCode,
    direction
) {
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
    this.img = img;
    this.animationTime = animationTime;
    this.animationWay = animationWay;
    this.animationType = animationType;
    this.lastKeyCode = lastKeyCode;
    this.direction = direction;

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
    const img = bombermanData.img;
    const animationTime = BOMBERMAN_ANIMATION_TIME;
    const animationWay = 'down';
    const animationType = '2';
    const lastKeyCode = bombermanData.keyCode;
    const direction = 'down';

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
        keyCode,
        img,
        animationTime,
        animationWay,
        animationType,
        lastKeyCode,
        direction
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
const BARRIER_WIDTH = 50;
const BARRIER_HEIGHT = 50;
const BARRIER_IMG_COORDINATES = {
    'x': 70,
    'y': 174,
    'width': 17,
    'height': 17,
};

const BLOCK_IMG_COORDINATES = {
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
const BOMB_RADIUS = 25;
const BOMB_LIFETIME = 3; //в милисекундах
const FIRE_SIZE = 5;
const EXPLOSION_TIME = 0.5; //в милисекундах
const BOMB_ANIMATION_TIME = 20;
const BOMB_START_TIMING = 0.5; //в секундах
const START_FIRE_COMPONENT = 'center';
const BOMB_IMG_COORDINATES = [{
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
const FIRE_IMG_COORDINATES = {
    'center': {
        'small': {'x': 184, 'y': 289, 'width': 17, 'height': 17},
        'middle': {'x': 265, 'y': 289, 'width': 17, 'height': 17},
        'average': {'x': 349, 'y': 289, 'width': 17, 'height': 17},
        'big': {'x': 433, 'y': 289, 'width': 17, 'height': 17},
        'huge': {'x': 517, 'y': 289, 'width': 17, 'height': 17}
    },
    'right': {
        'base': {
            'small': {'x': 201, 'y': 289, 'width': 17, 'height': 17},
            'middle': {'x': 282, 'y': 289, 'width': 17, 'height': 17},
            'average': {'x': 366, 'y': 289, 'width': 17, 'height': 17},
            'big': {'x': 450, 'y': 289, 'width': 17, 'height': 17},
            'huge': {'x': 534, 'y': 289, 'width': 17, 'height': 17}
        },
        'end': {
            'small': {'x': 218, 'y': 289, 'width': 17, 'height': 17},
            'middle': {'x': 299, 'y': 289, 'width': 17, 'height': 17},
            'average': {'x': 383, 'y': 289, 'width': 17, 'height': 17},
            'big': {'x': 467, 'y': 289, 'width': 17, 'height': 17},
            'huge': {'x': 551, 'y': 289, 'width': 17, 'height': 17}
        },
    },
    'down': {
        'base': {
            'small': {'x': 184, 'y': 306, 'width': 17, 'height': 17},
            'middle': {'x': 265, 'y': 306, 'width': 17, 'height': 17},
            'average': {'x': 349, 'y': 306, 'width': 17, 'height': 17},
            'big': {'x': 433, 'y': 306, 'width': 17, 'height': 17},
            'huge': {'x': 517, 'y': 306, 'width': 17, 'height': 17}
        },
        'end': {
            'small': {'x': 184, 'y': 323, 'width': 17, 'height': 17},
            'middle': {'x': 265, 'y': 323, 'width': 17, 'height': 17},
            'average': {'x': 349, 'y': 323, 'width': 17, 'height': 17},
            'big': {'x': 433, 'y': 323, 'width': 17, 'height': 17},
            'huge': {'x': 517, 'y': 323, 'width': 17, 'height': 17}
        }
    },
    'left': {
        'base': {
            'small': {'x': 167, 'y': 289, 'width': 17, 'height': 17},
            'middle': {'x': 248, 'y': 289, 'width': 17, 'height': 17},
            'average': {'x': 332, 'y': 289, 'width': 17, 'height': 17},
            'big': {'x': 416, 'y': 289, 'width': 17, 'height': 17},
            'huge': {'x': 500, 'y': 289, 'width': 17, 'height': 17}
        },
        'end': {
            'small': {'x': 151, 'y': 289, 'width': 17, 'height': 17},
            'middle': {'x': 231, 'y': 289, 'width': 17, 'height': 17},
            'average': {'x': 315, 'y': 289, 'width': 17, 'height': 17},
            'big': {'x': 399, 'y': 289, 'width': 17, 'height': 17},
            'huge': {'x': 483, 'y': 289, 'width': 17, 'height': 17}
        }
    },
    'up': {
        'base': {
            'small': {'x': 184, 'y': 272, 'width': 17, 'height': 17},
            'middle': {'x': 265, 'y': 272, 'width': 17, 'height': 17},
            'average': {'x': 349, 'y': 272, 'width': 17, 'height': 17},
            'big': {'x': 433, 'y': 272, 'width': 17, 'height': 17},
            'huge': {'x': 517, 'y': 272, 'width': 17, 'height': 17}
        },
        'end': {
            'small': {'x': 184, 'y': 255, 'width': 17, 'height': 17},
            'middle': {'x': 265, 'y': 255, 'width': 17, 'height': 17},
            'average': {'x': 349, 'y': 255, 'width': 17, 'height': 17},
            'big': {'x': 433, 'y': 255, 'width': 17, 'height': 17},
            'huge': {'x': 517, 'y': 255, 'width': 17, 'height': 17}
        }
    }
};

function Bomb(
    bombPosition,
    radius,
    fireRadius,
    lifeTime,
    explosionTime,
    whoseBomb,
    allowedCollision,
    img,
    imgIndex,
    animationTime,
    animationWay,
    isFireEnd,
    fireComponent,
    fireTiming
) {
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
    this.isFireEnd = isFireEnd;
    this.fireComponent = fireComponent;
    this.fireTiming = fireTiming;
}

function createBomb(position, lt, bomberId) {
    const bombPosition = position;
    const bombRadius = BOMB_RADIUS;
    const fireRadius = FIRE_SIZE;
    const lifeTime = lt;
    const explosionTime = EXPLOSION_TIME;
    const whoseBomb = bomberId;
    const allowedCollision = false;
    const img = BOMB_IMG_COORDINATES;
    const imgIndex = 0;
    const animationTime = BOMB_ANIMATION_TIME;
    const animationWay = 'down';
    const isFireEnd = false;
    const fireComponent = START_FIRE_COMPONENT;
    const fireTiming = BOMB_START_TIMING;

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
        animationWay,
        isFireEnd,
        fireComponent,
        fireTiming,
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
    BLOCK_IMG_COORDINATES,
    BARRIER_IMG_COORDINATES,
    FIRE_IMG_COORDINATES,
    EXPLOSION_TIME,
    BOMBERMAN_1,
    BOMBERMAN_2,
    BOMBERMAN_3,
    BOMBERMAN_4,
    NUMBER_OF_BOMBERMANS,
    BOMB_LIFETIME,
    BOMB_IMG_COORDINATES,
    BOMB_RADIUS,
    BOMB_ANIMATION_TIME,
    BARRIER_WIDTH,
    BARRIER_HEIGHT,
    BOMBERMAN_ANIMATION_TIME
};