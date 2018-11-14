const BOMB_RADIUS = 22;
const BOMB_START_ANGLE = 0;
const BOMB_END_ANGLE = Math.PI * 2;
const BOMB_COLOR = '#222';
const BOMB_TIMEOUT = 2500; //в милисекундах
const FIRE_SIZE = 2;
const FIRE_COLOR = '#FF0000';
const EXPLOSION_TIME_FOR_CELL = 200; //в милисекундах
const EXPLOSION_TIME = (EXPLOSION_TIME_FOR_CELL * FIRE_SIZE * 2) - EXPLOSION_TIME_FOR_CELL ; //в милисекундах

function Bomb(bombX, bombY, radius, radiusStart, radiusEnd, bombColor, fireRadius, fireColor, explosionTime) {
    this.x = bombX;
    this.y = bombY;
    this.radius = radius;
    this.radiusStart = radiusStart;
    this.radiusEnd = radiusEnd;
    this.color = bombColor;
    this.fireRadius = fireRadius;
    this.fireColor = fireColor;
    this.explosionTime = explosionTime;
}

function createBomb(bombPositionX, bombPositionY) {
    const bombX = bombPositionX;
    const bombY = bombPositionY;
    const bombRadius = BOMB_RADIUS;
    const bombStartAngle = BOMB_START_ANGLE;
    const bombEndAngle = BOMB_END_ANGLE;
    const bombColor = BOMB_COLOR;
    const fireRadius = FIRE_SIZE;
    const fireColor = FIRE_COLOR;
    const explosionTime = EXPLOSION_TIME;

    return new Bomb (
        bombX,
        bombY,
        bombRadius,
        bombStartAngle,
        bombEndAngle,
        bombColor,
        fireRadius,
        fireColor,
        explosionTime,
    );
}

export {
    BOMB_TIMEOUT,
    EXPLOSION_TIME,
    createBomb,
};