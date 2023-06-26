import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import Board from './model/board';
import * as Chess from './model/chess'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())

app.get('/board', (req: Request, res: Response) => {
  let board = new Board()
  board.init()
  let result : any;
  result = board;
  console.log(board.print())
  res.send(JSON.stringify(result));
});

// check moveSet of sq on board
app.post('/board/moves', (req: Request, res: Response) => {
  const params = req.body
  const b = params.board
  const r = params.r
  const f = params.f
  let board:Board;

  if (b==null){
    board = new Board()
    board.init()
  } else {
    board = new Board(b)
  }
  console.log(`POST /board/moves : ${r}, ${f}, ${b}`)

  let result : any;
  result = board.moves(r,f)
  res.send(JSON.stringify(result));
});


// check moveSet of character : /moveSet/King
app.get('/character/:char', (req: Request, res: Response) => {
  const c = req.params.char as string;
  const chessClass = Chess.chessMaker[c]
  
  let result = {
    symbol : chessClass.symbol,
    qty : chessClass.qty,
    moveSet : chessClass.moveSet,
    initialMoveSet : chessClass.initialMoveSet,
    captureMoveSet : chessClass.captureMoveSet,
  }
  res.send(JSON.stringify(result));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});