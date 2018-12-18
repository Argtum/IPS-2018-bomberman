const BARRIER_WIDTH = 44;
const BARRIER_HEIGHT = 44;
const BARRIER_COLOR = '#555';
const BLOCK_COLOR = '#4286f4';

function Block(barrierPosition, barrierWidth, barrierHeight, barrierColor) {
    this.position = barrierPosition;
    this.width = barrierWidth;
    this.height = barrierHeight;
    this.barrierColor = barrierColor;
}

function createBarriers(position, color) {
    const barrierPosition = position;
    const barrierWidth = BARRIER_WIDTH;
    const barrierHeight = BARRIER_HEIGHT;
    const barrierColor = color;

    return new Block(
        barrierPosition,
        barrierWidth,
        barrierHeight,
        barrierColor
    );
}

export {
    createBarriers,
    BLOCK_COLOR,
    BARRIER_COLOR,
};
