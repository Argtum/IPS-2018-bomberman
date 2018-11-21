const ARENA_START_POINT_X = 0;
const ARENA_START_POINT_Y = 0;
const ARENA_CELL = 50;
const NUMBER_OF_CELL_X = 15;
const NUMBER_OF_CELL_Y = 11;
const ARENA_BACKGROUND_COLOR = '#CCC';

function ArenaCanvas(arenaStartX, arenaStartY, arenaWidth, arenaHeight, backgroundColor) {
    this.startX = arenaStartX;
    this.startY = arenaStartY;
    this.arenaWidth = arenaWidth;
    this.arenaHeight = arenaHeight;
    this.backgroundColor = backgroundColor;
}

function createArena() {
    const arenaStartX = ARENA_START_POINT_X;
    const arenaStartY = ARENA_START_POINT_Y;
    const arenaWidth = ARENA_CELL * NUMBER_OF_CELL_X;
    const arenaHeight = ARENA_CELL * NUMBER_OF_CELL_Y;
    const backgroundColor = ARENA_BACKGROUND_COLOR;

    return new ArenaCanvas (
        arenaStartX,
        arenaStartY,
        arenaWidth,
        arenaHeight,
        backgroundColor
    );
}

function getCellKey(j, i) {
    return j.toString() + i.toString();
}

function createArenaMap() {
    let arenaMap = {};
    for(let j = 0; j < NUMBER_OF_CELL_Y; j++) {
        for(let i = 0; i < NUMBER_OF_CELL_X; i++) {
            const key = getCellKey(j, i);
            arenaMap[key] = {x:j, y:i};
        }
    }
    return arenaMap;
}

function arenaMapProcessing() {
    this._cellMap = {};

    this.add = function(objPlace) {
        this._cellMap[objPlace] = true;
    };

    this.remove = function(objPlace) {
        delete this._cellMap[objPlace];
    };

    this.isEmpty = function(objPlace) {
        return !Boolean(this._cellMap[objPlace]);
    };

    Object.freeze(this);
}

export {
    ARENA_CELL,
    createArena,
    createArenaMap,
    arenaMapProcessing,
};