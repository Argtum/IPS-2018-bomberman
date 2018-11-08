const BOMB_RADIUS = 22;
const BOMB_START_ANGLE = 0;
const BOMB_END_ANGLE = Math.PI * 2;
const BOMB_COLOR = '#FFF';

function Bomb(radius, radiusStart, radiusEnd) {
    this.radius = radius;
    this.radiusStart = radiusStart;
    this.radiusEnd = radiusEnd;
}

function createBomb() {
    const bombRadius = BOMB_RADIUS;
    const bombStartAngle = BOMB_START_ANGLE;
    const bombEndAngle = BOMB_END_ANGLE;
    const bombColor = BOMB_COLOR;

    return new Bomb (
        bombRadius,
        bombStartAngle,
        bombEndAngle,
        bombColor,
    );
}

export {
    createBomb,
};