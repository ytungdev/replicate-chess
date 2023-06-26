"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.possibleMove = exports.charactersMeta = void 0;
const board_1 = __importDefault(require("./board"));
exports.charactersMeta = {
    King: {
        symbol: 'K', qty: 1, move: [
            { rank: 0, file: 1, step: 1 },
            { rank: 1, file: 1, step: 1 },
            { rank: 1, file: 0, step: 1 },
            { rank: 1, file: -1, step: 1 },
            { rank: 0, file: -1, step: 1 },
            { rank: -1, file: -1, step: 1 },
            { rank: -1, file: 0, step: 1 },
            { rank: -1, file: 1, step: 1 }
        ]
    },
    Queen: {
        symbol: 'Q', qty: 1, move: [
            { rank: 0, file: 1, step: 7 },
            { rank: 1, file: 1, step: 7 },
            { rank: 1, file: 0, step: 7 },
            { rank: 1, file: -1, step: 7 },
            { rank: 0, file: -1, step: 7 },
            { rank: -1, file: -1, step: 7 },
            { rank: -1, file: 0, step: 7 },
            { rank: -1, file: 1, step: 7 },
        ]
    },
    Rook: {
        symbol: 'R', qty: 2, move: [
            { rank: 0, file: 1, step: 7 },
            { rank: 1, file: 0, step: 7 },
            { rank: 0, file: -1, step: 7 },
            { rank: -1, file: 0, step: 7 },
        ]
    },
    Bishop: {
        symbol: 'B', qty: 2, move: [
            { rank: 1, file: 1, step: 7 },
            { rank: 1, file: -1, step: 7 },
            { rank: -1, file: -1, step: 7 },
            { rank: -1, file: 1, step: 7 },
        ]
    },
    Knight: {
        symbol: 'N', qty: 2, move: [
            { rank: 1, file: 2, step: 1 },
            { rank: 2, file: 1, step: 1 },
            { rank: 2, file: -1, step: 1 },
            { rank: 1, file: -2, step: 1 },
            { rank: -1, file: -2, step: 1 },
            { rank: -2, file: -1, step: 1 },
            { rank: -2, file: 1, step: 1 },
            { rank: -1, file: 2, step: 1 },
        ]
    },
    Pawn: {
        symbol: 'P', qty: 8, move: []
    }
};
const possibleMove = (character, color, rank, file) => {
    let result = [];
    const moveSet = exports.charactersMeta[character].move;
    for (let n in moveSet) {
        const action = moveSet[n];
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
exports.possibleMove = possibleMove;
