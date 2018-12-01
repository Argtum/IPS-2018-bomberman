const BOMBERMAN_RADIUS = 22;
const BOMBERMAN_SPEED = new Vec2(200, 200);
const BOMBER_START_ANGLE = 0;
const BOMBER_END_ANGLE = Math.PI * 2;
const BOMBERMAN_COLOR = '#999';
const NUMBERS_OF_BOMBS = 1;
const BOMBERMAN_START_POSITION_X = 25;
const BOMBERMAN_START_POSITION_Y = 25;

function Vec2(x, y) {
    this.x = x;
    this.y = y;

    this.add = function(vec) {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    };
    this.multiplyScalar = function(scalar) {
        return new Vec2(this.x * scalar, this.y * scalar);
    };
    this.multiply = function(vec) {
        return new Vec2(this.x * vec.x, this.y * vec.y);
    };
    Object.freeze(this);
}
Vec2.ZERO = new Vec2(0, 0);

const Direction = {
    UP: new Vec2(0, -1),
    DOWN: new Vec2(0, 1),
    LEFT: new Vec2(-1, 0),
    RIGHT: new Vec2(1, 0),
};
Object.freeze(Direction);

function BomberCanvas(bomberPosition, bomberSpeed, bomberRadius, bomberColor, bomberStartAngle, bomberEndAngle, numberOfBombs, serialNumber) {
    this.radius = bomberRadius;
    this.speed = bomberSpeed;
    this.bomberColor = bomberColor;
    this.radiusStart = bomberStartAngle;
    this.radiusEnd = bomberEndAngle;
    this.position = bomberPosition;
    this.numberOfBombs = numberOfBombs;
    this.number = serialNumber;
}

function createBomber(position, number) {
    const bomberPosition = position;
    const bomberSpeed = BOMBERMAN_SPEED;
    const bomberRadius = BOMBERMAN_RADIUS;
    const bomberColor = BOMBERMAN_COLOR;
    const bomberStartAngle = BOMBER_START_ANGLE;
    const bomberEndAngle = BOMBER_END_ANGLE;
    const numberOfBombs = NUMBERS_OF_BOMBS;
    const serialNumber = number;

    return new BomberCanvas (
        bomberPosition,
        bomberSpeed,
        bomberRadius,
        bomberColor,
        bomberStartAngle,
        bomberEndAngle,
        numberOfBombs,
        serialNumber,
    );
}

export {
    Vec2,
    BOMBERMAN_RADIUS,
    BOMBERMAN_START_POSITION_X,
    BOMBERMAN_START_POSITION_Y,
    Direction,
    createBomber,
};