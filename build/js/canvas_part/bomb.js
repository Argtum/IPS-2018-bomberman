const BOMB_RADIUS = 22;
const BOMB_START_ANGLE = 0;
const BOMB_END_ANGLE = Math.PI * 2;
const BOMB_COLOR = '#222';

function Bomb(bombX, bombY, radius, radiusStart, radiusEnd, bombColor) {
    this.x = bombX;
    this.y = bombY;
    this.radius = radius;
    this.radiusStart = radiusStart;
    this.radiusEnd = radiusEnd;
    this.color = bombColor;
}

function createBomb(bombPositionX, bombPositionY) {
    const bombX = bombPositionX;
    const bombY = bombPositionY;
    const bombRadius = BOMB_RADIUS;
    const bombStartAngle = BOMB_START_ANGLE;
    const bombEndAngle = BOMB_END_ANGLE;
    const bombColor = BOMB_COLOR;

    return new Bomb (
        bombX,
        bombY,
        bombRadius,
        bombStartAngle,
        bombEndAngle,
        bombColor,
    );
}

export {
    createBomb,
};