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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const board_1 = __importDefault(require("./model/board"));
const Chess = __importStar(require("./model/chess"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
let board = new board_1.default();
board.init();
app.use(express_1.default.json());
app.get('/board', (req, res) => {
    let result;
    result = board; //.show()
    res.send(JSON.stringify(result));
});
// check moveSet of sq on board
app.post('/board/moves', (req, res) => {
    const params = req.body;
    const b = params.board;
    const r = params.r;
    const f = params.f;
    const board = new board_1.default(b);
    console.log(`POST /board/moves : ${r}, ${f}, ${b}`);
    let result;
    result = board.moves(r, f);
    res.send(JSON.stringify(result));
});
// check moveSet of character : /moveSet?c=King
app.get('/moveSet', (req, res) => {
    const c = req.query.c;
    const chessClass = Chess.chessMaker[c];
    let result = chessClass.moveSet;
    res.send(JSON.stringify(result));
});
app.get('/lookAt', (req, res) => {
    const r = req.query.r;
    const f = req.query.f;
    let result = board.lookAt(r, f);
    res.send(JSON.stringify(result));
});
app.get('/test', (req, res) => {
    const id = 'wK0';
    const meta = Chess.chessDict[id];
    const char = meta.character;
    const make = Chess.chessMaker[char];
    let chess = new make('wK0');
    let result = chess;
    res.send(JSON.stringify(result));
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
