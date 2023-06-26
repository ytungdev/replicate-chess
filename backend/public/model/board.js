"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = void 0;
const Chess = __importStar(require("./chess"));
class Square {
    constructor(color, rank, file) {
        this.id = rank + file;
        this.color = color;
        this.rank = rank;
        this.file = file;
        this.occupier = null;
    }
}
exports.Square = Square;
class Board {
    constructor(board = null) {
        this.board = {};
        this.moves = (rank, file) => {
            let result = {
                character: null,
                color: null,
                moves: [],
                promote: []
            };
            const chess = this.board[rank][file].occupier;
            if (chess == null) {
                return result;
            }
            const char = chess.character;
            const color = chess.color;
            result.character = char;
            result.color = color;
            let moveSet = chess.moveSet;
            let captureSet = chess.captureMoveSet;
            if (char == 'Pawn') {
                const direction = chess.direction;
                if (rank == chess.rank && file == chess.file) {
                    moveSet = chess.initialMoveSet;
                }
                moveSet.map((move) => {
                    move.rank = move.rank * direction;
                });
                captureSet.map((move) => {
                    move.rank = move.rank * direction;
                });
                for (let c in captureSet) {
                    const action = captureSet[c];
                    for (let i = 1; i < action.step + 1; i++) {
                        const newR = Board.moveRank(rank, action.rank * i);
                        const newF = Board.moveFile(file, action.file * i);
                        if (newR && newF) {
                            const sq = this.board[newR][newF];
                            const occupier = sq.occupier;
                            const id = newR + newF;
                            if (occupier != null) {
                                if (occupier.color != color) {
                                    result.moves.push(id);
                                }
                                break;
                            }
                        }
                    }
                }
                for (let m in moveSet) {
                    const action = moveSet[m];
                    for (let i = 1; i < action.step + 1; i++) {
                        const newR = Board.moveRank(rank, action.rank * i);
                        const newF = Board.moveFile(file, action.file * i);
                        if (newR && newF) {
                            const sq = this.board[newR][newF];
                            const occupier = sq.occupier;
                            const id = newR + newF;
                            if (occupier == null) {
                                result.moves.push(id);
                            }
                        }
                    }
                }
                let enemyBase;
                if (color == 'white') {
                    enemyBase = ['8a', '8b', '8c', '8d', '8e', '8f', '8g', '8h'];
                }
                else {
                    enemyBase = ['8a', '8b', '8c', '8d', '8e', '8f', '8g', '8h'];
                }
                result.moves.forEach(loc => {
                    if (enemyBase.includes(loc)) {
                        result.promote.push(loc);
                    }
                });
            }
            else {
                for (let m in moveSet) {
                    const action = moveSet[m];
                    for (let i = 1; i < action.step + 1; i++) {
                        const newR = Board.moveRank(rank, action.rank * i);
                        const newF = Board.moveFile(file, action.file * i);
                        if (newR && newF) {
                            const sq = this.board[newR][newF];
                            const occupier = sq.occupier;
                            const id = newR + newF;
                            if (occupier != null) {
                                if (occupier.color != color) {
                                    result.moves.push(id);
                                }
                                break;
                            }
                            if (occupier == null) {
                                result.moves.push(id);
                            }
                        }
                    }
                }
            }
            return result;
        };
        this.lookAt = (rank, file) => {
            return this.board[rank][file].occupier;
        };
        this.ranks = Board.ranks;
        this.files = Board.files;
        if (board == null) {
            for (let i = 0; i < 8; i++) {
                const r = this.ranks[i];
                this.board[r] = {};
                for (let j = 0; j < 8; j++) {
                    const f = this.files[j];
                    const c = (i + j) % 2 == 0 ? 'light' : 'dark';
                    this.board[r][f] = new Square(c, r, f);
                }
            }
        }
        else {
            this.board = board;
        }
    }
    init() {
        for (let chessId in Chess.chessDict) {
            const meta = Chess.chessDict[chessId];
            const char = meta.character;
            const make = Chess.chessMaker[char];
            let chess = new make(chessId);
            this.board[chess.rank][chess.file].occupier = chess;
        }
    }
    print() {
        //print in terminal
        let strlen = 1;
        let bstring = '';
        bstring += this.files.map((f) => { return `${f}`; }).join(" ");
        bstring += '\n';
        bstring += '-'.repeat((strlen + 1) * 8);
        bstring += '\n';
        for (let i = 0; i < 8; i++) {
            let b = [];
            const r = this.ranks[i];
            for (let j = 0; j < 8; j++) {
                const f = this.files[j];
                const sq = this.board[r][f];
                if (sq.occupier == null) {
                    const c = this.board[r][f].color == 'light' ? '□'.repeat(strlen) : '■'.repeat(strlen);
                    b.push(c);
                }
                else {
                    const sym = sq.occupier.color == 'white' ? sq.occupier.symbol[0] : sq.occupier.symbol[1];
                    b.push(sym);
                }
            }
            bstring += b.join(" ");
            bstring += `|${this.ranks[i]}\n`;
        }
        return bstring;
    }
    toArray() {
        let result = {
            files: this.files,
            ranks: this.ranks,
            board: []
        };
        for (let i = 0; i < 8; i++) {
            let row = [];
            const r = this.ranks[i];
            for (let j = 0; j < 8; j++) {
                const f = this.files[j];
                const sq = this.board[r][f];
                row.push(sq);
            }
            result.board.push(row);
        }
        return result;
    }
}
_a = Board;
Board.ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
Board.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
Board.moveRank = (curent, step) => {
    // '8' + 1 = '7'
    const curIdx = _a.ranks.indexOf(curent);
    const newIdx = curIdx + step;
    const newRank = _a.ranks[newIdx];
    if (newRank == undefined) {
        return false;
    }
    return newRank;
};
Board.moveFile = (curent, step) => {
    // 'a' + 1 = 'b'
    const curIdx = _a.files.indexOf(curent);
    const newIdx = curIdx + step;
    const newFile = _a.files[newIdx];
    if (newFile == undefined) {
        return false;
    }
    return newFile;
};
exports.default = Board;
