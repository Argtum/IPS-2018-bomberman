const BOMB_RADIUS = 22;
const BOMB_START_ANGLE = 0;
const BOMB_END_ANGLE = Math.PI * 2;
const BOMB_COLOR = '#222';
const BOMB_LIFETIME = 3; //в милисекундах
const FIRE_SIZE = 2;
const FIRE_COLOR = '#FF0000';
const EXPLOSION_TIME = 0.5; //в милисекундах

function BombCanvas(bombPosition, radius, radiusStart, radiusEnd, bombColor, fireRadius, lifeTime, explosionTime, whoseBomb) {
    this.position = bombPosition;
    this.radius = radius;
    this.radiusStart = radiusStart;
    this.radiusEnd = radiusEnd;
    this.color = bombColor;
    this.fireRadius = fireRadius;
    this.lifeTime = lifeTime;
    this.explosionTime = explosionTime;
    this.whoseBomb = whoseBomb;
}

function createBomb(position, lt, bomber) {
    const bombPosition = position;
    const bombRadius = BOMB_RADIUS;
    const bombStartAngle = BOMB_START_ANGLE;
    const bombEndAngle = BOMB_END_ANGLE;
    const bombColor = BOMB_COLOR;
    const fireRadius = FIRE_SIZE;
    const lifeTime = lt;
    const explosionTime = EXPLOSION_TIME;
    const whoseBomb = bomber;

    return new BombCanvas (
        bombPosition,
        bombRadius,
        bombStartAngle,
        bombEndAngle,
        bombColor,
        fireRadius,
        lifeTime,
        explosionTime,
        whoseBomb,
    );
}

export {
    FIRE_COLOR,
    BOMB_LIFETIME,
    EXPLOSION_TIME,
    createBomb,
};