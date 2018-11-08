const ARENA_START_POINT_X = 0;
const ARENA_START_POINT_Y = 0;
const ARENA_CELL_WIDTH = 50;
const ARENA_CELL_HEIGHT = 50;
const NUMBER_OF_CELL_X = 15;
const NUMBER_OF_CELL_Y = 11;
const ARENA_BACKGROUND_COLOR = '#CCC';

function Arena(arenaStartX, arenaStartY, arenaWidth, arenaHeight, backgroundColor) {
    this.startX = arenaStartX;
    this.startY = arenaStartY;
    this.arenaWidth = arenaWidth;
    this.arenaHeight = arenaHeight;
    this.backgroundColor = backgroundColor;
}

function createArena() {
    const arenaStartX = ARENA_START_POINT_X;
    const arenaStartY = ARENA_START_POINT_Y;
    const arenaWidth = ARENA_CELL_WIDTH * NUMBER_OF_CELL_X;
    const arenaHeight = ARENA_CELL_HEIGHT * NUMBER_OF_CELL_Y;
    const backgroundColor = ARENA_BACKGROUND_COLOR;

    return new Arena (
        arenaStartX,
        arenaStartY,
        arenaWidth,
        arenaHeight,
        backgroundColor
    );
}

export {
    ARENA_CELL_HEIGHT,
    ARENA_CELL_WIDTH,
    createArena,
};