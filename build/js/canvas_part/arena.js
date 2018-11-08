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

export {
    ARENA_START_POINT_X,
    ARENA_START_POINT_Y,
    ARENA_CELL_WIDTH,
    ARENA_CELL_HEIGHT,
    NUMBER_OF_CELL_X,
    NUMBER_OF_CELL_Y,
    ARENA_BACKGROUND_COLOR,
    Arena,
};