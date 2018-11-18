const BOMB_RADIUS = 22;
const BOMB_START_ANGLE = 0;
const BOMB_END_ANGLE = Math.PI * 2;
const BOMB_COLOR = '#222';
const BOMB_LIFETIME = 2.5; //в милисекундах
const FIRE_SIZE = 1;
const FIRE_COLOR = '#FF0000';
const EXPLOSION_TIME_FOR_CELL = 0.2;
const EXPLOSION_TIME = (EXPLOSION_TIME_FOR_CELL * FIRE_SIZE * 2) - EXPLOSION_TIME_FOR_CELL; //в милисекундах

function BombCanvas(bombPosition, radius, radiusStart, radiusEnd, bombColor, fireRadius, fireColor, lifeTime, explosionTime) {
    this.position = bombPosition;
    this.radius = radius;
    this.radiusStart = radiusStart;
    this.radiusEnd = radiusEnd;
    this.color = bombColor;
    this.fireRadius = fireRadius;
    this.fireColor = fireColor;
    this.lifeTime = lifeTime;
    this.explosionTime = explosionTime;
}

function createBomb(position) {
    const bombPosition = position;
    const bombRadius = BOMB_RADIUS;
    const bombStartAngle = BOMB_START_ANGLE;
    const bombEndAngle = BOMB_END_ANGLE;
    const bombColor = BOMB_COLOR;
    const fireRadius = FIRE_SIZE;
    const fireColor = FIRE_COLOR;
    const lifeTime = BOMB_LIFETIME;
    const explosionTime = EXPLOSION_TIME;

    return new BombCanvas (
        bombPosition,
        bombRadius,
        bombStartAngle,
        bombEndAngle,
        bombColor,
        fireRadius,
        fireColor,
        lifeTime,
        explosionTime,
    );
}

export {
    createBomb,
};