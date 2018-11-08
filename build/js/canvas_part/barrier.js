const BARRIER_WIDTH = 44;
const BARRIER_HEIGHT = 44;
const BARRIER_COLOR = '#555';
const BARRIER_CORRECTION = 3;

function Barrier(barrierStartX, barrierStartY, barrierWidth, barrierHeight, barrierColor) {
    this.startX = barrierStartX;
    this.startY = barrierStartY;
    this.width = barrierWidth;
    this.height = barrierHeight;
    this.barrierColor = barrierColor;
}

export {
    BARRIER_WIDTH,
    BARRIER_HEIGHT,
    BARRIER_COLOR,
    BARRIER_CORRECTION,
    Barrier,
};