import Board from "./board"

type ChessDict = {
    [key: string]: { rank: string, file: string, color: string, character: string }
}

export const chessDict: ChessDict = {
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
}


export class Base {
    id: string
    color: string;
    character: string;
    rank: string;
    file: string;
    moveSet:Move[];
    initialMoveSet:Move[];
    captureMoveSet:Move[];
    symbol:string[];

    constructor(id: string) {
        this.id = id
        this.color = chessDict[id].color;
        this.character = chessDict[id].character;
        this.rank = chessDict[id].rank;
        this.file = chessDict[id].file;
        this.moveSet = [];
        this.initialMoveSet = [];
        this.captureMoveSet = [];
        this.symbol = []
    }

    possibleMove = (rank:string, file:string):Loc[] => {
        let result:Loc[] = []
        for (let n in this.moveSet){
            const action = this.moveSet[n]
            for (let i=1;i<action.step+1;i++){
                const newR = Board.moveRank(rank, action.rank*i)
                const newF = Board.moveFile(file, action.file*i)
                if(newR && newF){
                    result.push({rank:newR, file:newF})
                }
            }
        }
        return result
    }
}

type Move = { rank: number, file: number, step: number }
type Loc = { rank: string, file: string }


export class King extends Base {
    symbol = ['♔','♚','K']
    qty: number = 1
    static moveSet: Move[] = [
        { rank: 0, file: 1, step: 1 },
        { rank: 1, file: 1, step: 1 },
        { rank: 1, file: 0, step: 1 },
        { rank: 1, file: -1, step: 1 },
        { rank: 0, file: -1, step: 1 },
        { rank: -1, file: -1, step: 1 },
        { rank: -1, file: 0, step: 1 },
        { rank: -1, file: 1, step: 1 }
    ]
    moveSet = King.moveSet;
}
export class Queen extends Base {
    symbol = ['♕','♛','Q']
    qty: number = 1
    static moveSet: Move[] = [
        { rank: 0, file: 1, step: 7 },
        { rank: 1, file: 1, step: 7 },
        { rank: 1, file: 0, step: 7 },
        { rank: 1, file: -1, step: 7 },
        { rank: 0, file: -1, step: 7 },
        { rank: -1, file: -1, step: 7 },
        { rank: -1, file: 0, step: 7 },
        { rank: -1, file: 1, step: 7 },
    ]
    moveSet = Queen.moveSet;
}
export class Rook extends Base {
    symbol = ['','','R']
    qty: number = 2
    static moveSet: Move[] = [
        { rank: 0, file: 1, step: 7 },
        { rank: 1, file: 0, step: 7 },
        { rank: 0, file: -1, step: 7 },
        { rank: -1, file: 0, step: 7 },
    ]
    moveSet = Rook.moveSet;
}
export class Bishop extends Base {
    symbol = ['','','B']
    qty: number = 2
    static moveSet: Move[] = [
        { rank: 1, file: 1, step: 7 },
        { rank: 1, file: -1, step: 7 },
        { rank: -1, file: -1, step: 7 },
        { rank: -1, file: 1, step: 7 },
    ]
    moveSet = Bishop.moveSet;
}
export class Knight extends Base {
    symbol = ['','','N']
    qty: number = 2
    static moveSet: Move[] = [
        { rank: 1, file: 2, step: 1 },
        { rank: 2, file: 1, step: 1 },
        { rank: 2, file: -1, step: 1 },
        { rank: 1, file: -2, step: 1 },
        { rank: -1, file: -2, step: 1 },
        { rank: -2, file: -1, step: 1 },
        { rank: -2, file: 1, step: 1 },
        { rank: -1, file: 2, step: 1 },
    ]
    moveSet = Knight.moveSet;
}
export class Pawn extends Base {
    symbol = ['','','P']
    qty: number = 8
    //base on white
    static moveSet: Move[] = [
        { rank: -1, file: 0, step: 1 },
    ]

    static initialMoveSet: Move[] = [
        { rank: -1, file: 0, step: 2 },
    ]

    static captureMoveSet: Move[] = [
        { rank: -1, file: 1, step: 1 },
        { rank: -1, file: -1, step: 1 },
    ]
    moveSet = Pawn.moveSet;
    initialMoveSet = Pawn.initialMoveSet;
    captureMoveSet = Pawn.captureMoveSet;
}

export const chessMaker:{[key:string]:any} = {
    'King':King,
    'Queen':Queen,
    'Rook':Rook,
    'Bishop':Bishop,
    'Knight':Knight,
    'Pawn':Pawn,
}
