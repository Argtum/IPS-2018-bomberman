import {Vec2} from "./bomber.canvas.js";

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

function getCurrentPosition(bomber) {
    const xPosition = Math.ceil(bomber.position.x / ARENA_CELL);
    const yPosition = Math.ceil(bomber.position.y / ARENA_CELL);

    return new Vec2(xPosition * ARENA_CELL - ARENA_CELL / 2, yPosition * ARENA_CELL - ARENA_CELL / 2);
}

function ArenaPlaces() {
    this._cellMap = [];

    for (let x = 0; x < NUMBER_OF_CELL_X; ++x) {
        this._cellMap.push([]);
        for (let y = 0; y < NUMBER_OF_CELL_Y; ++y) {
            this._cellMap[x].push({
                obj: {},
                type: "empty",
            });
        }
    }

    this.takePlace = function(obj, type) {
        const x = Math.floor(obj.position.x / ARENA_CELL);
        const y = Math.floor(obj.position.y / ARENA_CELL);
        this._cellMap[x][y] = {
            'obj':  obj,
            'type': type,
        }
    };

    this.freePlace = function(x, y) {
        this._cellMap[x][y] = {
            obj: {},
            type: "empty",
        };
    };

    this.getObj = function(x, y) {
        return this._cellMap[x][y].obj;
    };

    this.whatType = function(x, y) {
        return this._cellMap[x][y].type;
    };

    Object.freeze(this);
}

export {
    NUMBER_OF_CELL_X,
    NUMBER_OF_CELL_Y,
    ARENA_CELL,
    getCurrentPosition,
    ArenaPlaces,
    createArena,
};