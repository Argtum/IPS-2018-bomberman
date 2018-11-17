const BARRIER_WIDTH = 44;
const BARRIER_HEIGHT = 44;
const BARRIER_COLOR = '#555';
const BARRIER_CORRECTION = 3;

function BarrierCanvas(barrierStartX, barrierStartY, barrierWidth, barrierHeight, barrierColor) {
    this.startX = barrierStartX;
    this.startY = barrierStartY;
    this.width = barrierWidth;
    this.height = barrierHeight;
    this.barrierColor = barrierColor;
}

function createBarriers(startPositionX, startPositionY) {
    const barrierStartX = BARRIER_CORRECTION + startPositionX;
    const barrierStartY = BARRIER_CORRECTION + startPositionY;
    const barrierWidth = BARRIER_WIDTH;
    const barrierHeight = BARRIER_HEIGHT;
    const barrierColor = BARRIER_COLOR;

    return new BarrierCanvas (
        barrierStartX,
        barrierStartY,
        barrierWidth,
        barrierHeight,
        barrierColor
    );
}

export {
    createBarriers,
};