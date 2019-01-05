import {ARENA_CELL} from './arena.js';
import {Vec2} from './clickHandler.js';

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

function getUnbreakableBlocks(place, arena) {
    for (let y = ARENA_CELL; y < arena.arenaHeight; y += ARENA_CELL * 2) {
        for (let x = ARENA_CELL; x < arena.arenaWidth; x += ARENA_CELL * 2) {
            const barrierPosition = new Vec2(x, y);
            place.takePlace(createBarriers(barrierPosition, BARRIER_COLOR), 'barrier');
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getBreakableBlocks(place, arena) {
    for (let y = 0; y < arena.arenaHeight; y += ARENA_CELL) {
        for (let x = 0; x < arena.arenaWidth; x += ARENA_CELL) {
            const xPosition = Math.floor(x / ARENA_CELL);
            const yPosition = Math.floor(y / ARENA_CELL);
            if (place.whatType(xPosition, yPosition) == 'empty') {
                if (getRandomInt(0, 2)) {
                    const barrierPosition = new Vec2(x, y);
                    place.takePlace(createBarriers(barrierPosition, BLOCK_COLOR), 'block');
                }
            }
        }
    }
}

export {
    getUnbreakableBlocks,
    getBreakableBlocks,
    BLOCK_COLOR,
};
