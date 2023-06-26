# replicate-chess
For practice purposes. Inspired by n-knights and n-queen problem.

## Technologies
- **Language** : TypeScript
- **Framework** : Angular, Express.js


## Usage
```
//backend
npm run dev

//frontend
ng serve
```

## Terminology

- [Ranks](https://en.wikipedia.org/wiki/Glossary_of_chess#rank) : A row of the chessboard. ["1" ... "8"]
- [Files](https://en.wikipedia.org/wiki/Glossary_of_chess#file) : A column of the chessboard. ["a" ... "h"]
- Character : ['King', 'Queen', 'Rook', 'Bishop', 'Knight', 'Pawn']


## Functions

- Select : click on any non-highlighted sqaure on the board
  - selected square will be highlighted in red.
  - If occupier exist on selected square, sqaures of possible move will be highlighted in yellow.
    - only Pawn and Knight can move in initial setting (not blocked by allies)  
- Deselect : click on any red-highlighted sqaure on the board
  - Deselect square and change it to original color
- Move : click on any yellow-highlighted sqaure on the board
  - Move the chess on previously selected sqaure to target square
  - Capture enemy if landing on chess with oppoiste color
  - Win if capturing enemy King


## APIs

- `GET /board` : retrieve board object showing occupier in each squares in json format
  - return
    - board[rank][file] = Square
    - Sqaure.occupier = null | Chess

- `GET /character/{character}` : retrieve information of character class.
  - parameter
      - character
  - return
      - symbol:string[] : [white-html-entity, black-html-entity, letter-symbol],
      - qty:number : initial quantity of chess pieces,
      - moveSet:Move[] : array of moves( { rank: number, file: number, step: number } )
      - (Pawn) initialMoveSet:Move[] : chessClass.initialMoveSet,
      - (Pawn) captureMoveSet:Move[] : chessClass.captureMoveSet,

- `POST /board/moves` : check possible moves at certain position on board.
  - parameter
      - board (optional) : board object showing occupier in each squares, use initial board if omitted
      - r : rank of square to check for moves
      - f : file of square to check for moves
  - return : occupier at the position of board and its possible moves
      - character: (string | null),
      - color: ('white' | 'black | null),
      - moves:string[] : id of square that is available for move 
