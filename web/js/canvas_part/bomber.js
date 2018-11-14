const BOMBERMAN_RADIUS = 22;
const BOMBERMAN_SPEED = 200;
const BOMBER_START_ANGLE = 0;
const BOMBER_END_ANGLE = Math.PI * 2;
const BOMBERMAN_COLOR = '#999';
const BOMBERMAN_DIRECTION_X = 0;
const BOMBERMAN_DIRECTION_Y = 0;

function Bomber(bomberStartPositionX, bomberStartPositionY, bomberSpeed, bomberRadius, bomberColor, bomberStartAngle, bomberEndAngle, bomberDirectionX, bomberDirectionY) {
    this.x = bomberStartPositionX;
    this.y = bomberStartPositionY;
    this.speed = bomberSpeed;
    this.radius = bomberRadius;
    this.bomberColor = bomberColor;
    this.radiusStart = bomberStartAngle;
    this.radiusEnd = bomberEndAngle;
    this.directionX = bomberDirectionX;
    this.directionY = bomberDirectionY;
}

function createBomber(startPositionX, startPositionY) {
    const bomberStartPositionX = startPositionX;
    const bomberStartPositionY = startPositionY;
    const bomberSpeed = BOMBERMAN_SPEED;
    const bomberRadius = BOMBERMAN_RADIUS;
    const bomberColor = BOMBERMAN_COLOR;
    const bomberStartAngle = BOMBER_START_ANGLE;
    const bomberEndAngle = BOMBER_END_ANGLE;
    const bomberDirectionX = BOMBERMAN_DIRECTION_X;
    const bomberDirectionY = BOMBERMAN_DIRECTION_Y;


    return new Bomber (
        bomberStartPositionX,
        bomberStartPositionY,
        bomberSpeed,
        bomberRadius,
        bomberColor,
        bomberStartAngle,
        bomberEndAngle,
        bomberDirectionX,
        bomberDirectionY
    );
}

export {
    createBomber,
};