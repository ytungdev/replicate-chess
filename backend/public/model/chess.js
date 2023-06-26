"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chessMaker = exports.Pawn = exports.Knight = exports.Bishop = exports.Rook = exports.Queen = exports.King = exports.Base = exports.chessDict = void 0;
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
        this.id = id;
        this.color = exports.chessDict[id].color;
        this.character = exports.chessDict[id].character;
        this.rank = exports.chessDict[id].rank;
        this.file = exports.chessDict[id].file;
        this.moveSet = [];
        this.initialMoveSet = [];
        this.captureMoveSet = [];
        this.symbol = [];
    }
}
exports.Base = Base;
class King extends Base {
    constructor() {
        super(...arguments);
        this.moveSet = King.moveSet;
        this.symbol = King.symbol;
        this.qty = King.qty;
    }
}
exports.King = King;
King.symbol = ['♔', '♚', 'K'];
King.qty = 1;
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
        this.moveSet = Queen.moveSet;
        this.symbol = Queen.symbol;
        this.qty = Queen.qty;
    }
}
exports.Queen = Queen;
Queen.symbol = ['♕', '♛', 'Q'];
Queen.qty = 1;
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
        this.moveSet = Rook.moveSet;
        this.symbol = Rook.symbol;
        this.qty = Rook.qty;
    }
}
exports.Rook = Rook;
Rook.symbol = ['♖', '♜', 'R'];
Rook.qty = 2;
Rook.moveSet = [
    { rank: 0, file: 1, step: 7 },
    { rank: 1, file: 0, step: 7 },
    { rank: 0, file: -1, step: 7 },
    { rank: -1, file: 0, step: 7 },
];
class Bishop extends Base {
    constructor() {
        super(...arguments);
        this.moveSet = Bishop.moveSet;
        this.symbol = Bishop.symbol;
        this.qty = Bishop.qty;
    }
}
exports.Bishop = Bishop;
Bishop.symbol = ['♗', '♝', 'B'];
Bishop.qty = 2;
Bishop.moveSet = [
    { rank: 1, file: 1, step: 7 },
    { rank: 1, file: -1, step: 7 },
    { rank: -1, file: -1, step: 7 },
    { rank: -1, file: 1, step: 7 },
];
class Knight extends Base {
    constructor() {
        super(...arguments);
        this.moveSet = Knight.moveSet;
        this.symbol = Knight.symbol;
        this.qty = Knight.qty;
    }
}
exports.Knight = Knight;
Knight.symbol = ['♘', '♞', 'N'];
Knight.qty = 2;
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
        this.moveSet = Pawn.moveSet;
        this.initialMoveSet = Pawn.initialMoveSet;
        this.captureMoveSet = Pawn.captureMoveSet;
        this.symbol = Pawn.symbol;
        this.qty = Pawn.qty;
    }
}
exports.Pawn = Pawn;
Pawn.symbol = ['♙', '♟︎', 'P'];
Pawn.qty = 8;
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
