"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chessMaker = exports.Pawn = exports.Knight = exports.Bishop = exports.Rook = exports.Queen = exports.King = exports.Base = exports.chessDict = void 0;
const board_1 = __importDefault(require("./board"));
exports.chessDict = {
    wK0: { rank: '1', file: 'e', color: 'white', character: 'King' },
    wQ0: { rank: '1', file: 'd', color: 'white', character: 'Queen' },
    wR0: { rank: '1', file: 'a', color: 'white', character: 'Rook' },
    wR1: { rank: '1', file: 'h', color: 'white', character: 'Rook' },
    wB0: { rank: '1', file: 'c', color: 'white', character: 'Bishop' },
    wB1: { rank: '1', file: 'f', color: 'white', character: 'Bishop' },
    wN0: { rank: '1', file: 'b', color: 'white', character: 'Knight' },
    wN1: { rank: '1', file: 'g', color: 'white', character: 'Knight' },
    wP0: { rank: '2', file: 'a', color: 'white', character: 'Pawn' },
    wP1: { rank: '2', file: 'b', color: 'white', character: 'Pawn' },
    wP2: { rank: '2', file: 'c', color: 'white', character: 'Pawn' },
    wP3: { rank: '2', file: 'd', color: 'white', character: 'Pawn' },
    wP4: { rank: '2', file: 'e', color: 'white', character: 'Pawn' },
    wP5: { rank: '2', file: 'f', color: 'white', character: 'Pawn' },
    wP6: { rank: '2', file: 'g', color: 'white', character: 'Pawn' },
    wP7: { rank: '2', file: 'h', color: 'white', character: 'Pawn' },
    bK0: { rank: '8', file: 'e', color: 'black', character: 'King' },
    bQ0: { rank: '8', file: 'd', color: 'black', character: 'Queen' },
    bR0: { rank: '8', file: 'a', color: 'black', character: 'Rook' },
    bR1: { rank: '8', file: 'h', color: 'black', character: 'Rook' },
    bB0: { rank: '8', file: 'c', color: 'black', character: 'Bishop' },
    bB1: { rank: '8', file: 'f', color: 'black', character: 'Bishop' },
    bN0: { rank: '8', file: 'b', color: 'black', character: 'Knight' },
    bN1: { rank: '8', file: 'g', color: 'black', character: 'Knight' },
    bP0: { rank: '7', file: 'a', color: 'black', character: 'Pawn' },
    bP1: { rank: '7', file: 'b', color: 'black', character: 'Pawn' },
    bP2: { rank: '7', file: 'c', color: 'black', character: 'Pawn' },
    bP3: { rank: '7', file: 'd', color: 'black', character: 'Pawn' },
    bP4: { rank: '7', file: 'e', color: 'black', character: 'Pawn' },
    bP5: { rank: '7', file: 'f', color: 'black', character: 'Pawn' },
    bP6: { rank: '7', file: 'g', color: 'black', character: 'Pawn' },
    bP7: { rank: '7', file: 'h', color: 'black', character: 'Pawn' },
};
class Base {
    constructor(id) {
        this.possibleMove = (rank, file) => {
            let result = [];
            for (let n in this.moveSet) {
                const action = this.moveSet[n];
                for (let i = 1; i < action.step + 1; i++) {
                    const newR = board_1.default.moveRank(rank, action.rank * i);
                    const newF = board_1.default.moveFile(file, action.file * i);
                    if (newR && newF) {
                        result.push({ rank: newR, file: newF });
                    }
                }
            }
            return result;
        };
        this.id = id;
        this.color = exports.chessDict[id].color;
        this.character = exports.chessDict[id].character;
        this.rank = exports.chessDict[id].rank;
        this.file = exports.chessDict[id].file;
        this.moveSet = [];
        this.initialMoveSet = [];
        this.captureMoveSet = [];
    }
}
exports.Base = Base;
class King extends Base {
    constructor() {
        super(...arguments);
        this.symbol = 'K';
        this.qty = 1;
        this.moveSet = King.moveSet;
    }
}
exports.King = King;
King.moveSet = [
    { rank: 0, file: 1, step: 1 },
    { rank: 1, file: 1, step: 1 },
    { rank: 1, file: 0, step: 1 },
    { rank: 1, file: -1, step: 1 },
    { rank: 0, file: -1, step: 1 },
    { rank: -1, file: -1, step: 1 },
    { rank: -1, file: 0, step: 1 },
    { rank: -1, file: 1, step: 1 }
];
class Queen extends Base {
    constructor() {
        super(...arguments);
        this.symbol = 'Q';
        this.qty = 1;
        this.moveSet = Queen.moveSet;
    }
}
exports.Queen = Queen;
Queen.moveSet = [
    { rank: 0, file: 1, step: 7 },
    { rank: 1, file: 1, step: 7 },
    { rank: 1, file: 0, step: 7 },
    { rank: 1, file: -1, step: 7 },
    { rank: 0, file: -1, step: 7 },
    { rank: -1, file: -1, step: 7 },
    { rank: -1, file: 0, step: 7 },
    { rank: -1, file: 1, step: 7 },
];
class Rook extends Base {
    constructor() {
        super(...arguments);
        this.symbol = 'R';
        this.qty = 2;
        this.moveSet = Rook.moveSet;
    }
}
exports.Rook = Rook;
Rook.moveSet = [
    { rank: 0, file: 1, step: 7 },
    { rank: 1, file: 0, step: 7 },
    { rank: 0, file: -1, step: 7 },
    { rank: -1, file: 0, step: 7 },
];
class Bishop extends Base {
    constructor() {
        super(...arguments);
        this.symbol = 'B';
        this.qty = 2;
        this.moveSet = Bishop.moveSet;
    }
}
exports.Bishop = Bishop;
Bishop.moveSet = [
    { rank: 1, file: 1, step: 7 },
    { rank: 1, file: -1, step: 7 },
    { rank: -1, file: -1, step: 7 },
    { rank: -1, file: 1, step: 7 },
];
class Knight extends Base {
    constructor() {
        super(...arguments);
        this.symbol = 'N';
        this.qty = 2;
        this.moveSet = Knight.moveSet;
    }
}
exports.Knight = Knight;
Knight.moveSet = [
    { rank: 1, file: 2, step: 1 },
    { rank: 2, file: 1, step: 1 },
    { rank: 2, file: -1, step: 1 },
    { rank: 1, file: -2, step: 1 },
    { rank: -1, file: -2, step: 1 },
    { rank: -2, file: -1, step: 1 },
    { rank: -2, file: 1, step: 1 },
    { rank: -1, file: 2, step: 1 },
];
class Pawn extends Base {
    constructor() {
        super(...arguments);
        this.symbol = 'P';
        this.qty = 8;
        this.moveSet = Pawn.moveSet;
        this.initialMoveSet = Pawn.initialMoveSet;
        this.captureMoveSet = Pawn.captureMoveSet;
    }
}
exports.Pawn = Pawn;
//base on white
Pawn.moveSet = [
    { rank: -1, file: 0, step: 1 },
];
Pawn.initialMoveSet = [
    { rank: -1, file: 0, step: 2 },
];
Pawn.captureMoveSet = [
    { rank: -1, file: 1, step: 1 },
    { rank: -1, file: -1, step: 1 },
];
exports.chessMaker = {
    'King': King,
    'Queen': Queen,
    'Rook': Rook,
    'Bishop': Bishop,
    'Knight': Knight,
    'Pawn': Pawn,
};
