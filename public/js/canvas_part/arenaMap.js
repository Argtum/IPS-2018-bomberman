import {Vec2} from './clickHandler.js';
import {ARENA_CELL, NUMBER_OF_CELL_X, NUMBER_OF_CELL_Y} from './gameObjects.js';

function ArenaPlaces() {
    this._cellMap = [];

    this.clearMap = function() {
        for (let x = 0; x < NUMBER_OF_CELL_X; ++x) {
            this._cellMap.push([]);
            for (let y = 0; y < NUMBER_OF_CELL_Y; ++y) {
                this._cellMap[x].push({
                    obj: {},
                    type: 'empty',
                });
            }
        }
    };

    this.takePlace = function(obj, type) {
        const x = Math.floor(obj.position.x / ARENA_CELL);
        const y = Math.floor(obj.position.y / ARENA_CELL);
        this._cellMap[x][y] = {
            'obj': obj,
            'type': type,
        };
    };

    this.free = function(x, y) {
        this._cellMap[x][y] = {
            obj: {},
            type: 'empty',
        };
    };

    this.getObj = function(x, y) {
        return this._cellMap[x][y].obj;
    };

    this.whatType = function(x, y) {
        return this._cellMap[x][y].type;
    };
}

function getCurrentPosition(obj) {
    const xPosition = Math.ceil(obj.position.x / ARENA_CELL);
    const yPosition = Math.ceil(obj.position.y / ARENA_CELL);

    return new Vec2(xPosition * ARENA_CELL - ARENA_CELL / 2, yPosition * ARENA_CELL - ARENA_CELL / 2);
}

export {
    ArenaPlaces,
    getCurrentPosition,
};
