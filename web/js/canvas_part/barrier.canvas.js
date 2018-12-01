const BARRIER_WIDTH = 44;
const BARRIER_HEIGHT = 44;
const BARRIER_COLOR = '#555';

function BarrierCanvas(position, barrierWidth, barrierHeight, barrierColor) {
    this.position = position;
    this.width = barrierWidth;
    this.height = barrierHeight;
    this.barrierColor = barrierColor;
}

function createBarriers(position) {
    const bombPosition = position;
    const barrierWidth = BARRIER_WIDTH;
    const barrierHeight = BARRIER_HEIGHT;
    const barrierColor = BARRIER_COLOR;

    return new BarrierCanvas (
        position,
        barrierWidth,
        barrierHeight,
        barrierColor
    );
}

export {
    createBarriers,
};