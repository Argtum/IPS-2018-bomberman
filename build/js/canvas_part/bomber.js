const BOMBERMAN_RADIUS = 22;
const BOMBERMAN_SPEED = 200;
const CIRCLE_START_ANGLE = 0;
const CIRCLE_END_ANGLE = Math.PI * 2;
const BOMBERMAN_COLOR = '#999';
const BOMBERMAN_DIRECTION_X = 0;
const BOMBERMAN_DIRECTION_Y = 0;

function Bomber(startPositionX, startPositionY, speed, radius, bomberColor, radiusStart, radiusEnd, dirX, dirY) {
    this.x = startPositionX;
    this.y = startPositionY;
    this.speed = speed;
    this.radius = radius;
    this.bomberColor = bomberColor;
    this.radiusStart = radiusStart;
    this.radiusEnd = radiusEnd;
    this.directionX = dirX;
    this.directionY = dirY;
}

export {
    BOMBERMAN_RADIUS,
    BOMBERMAN_SPEED,
    CIRCLE_START_ANGLE,
    CIRCLE_END_ANGLE,
    BOMBERMAN_COLOR,
    BOMBERMAN_DIRECTION_X,
    BOMBERMAN_DIRECTION_Y,
    Bomber,
};