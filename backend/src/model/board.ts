import * as Chess from "./chess";

export class Square {
    id:string;
    color: string;
    rank: string;
    file: string;
    occupier: (null | Chess.Base | Chess.Pawn);
    constructor(color: string, rank: string, file: string) {
        this.id = rank+file
        this.color = color;
        this.rank = rank;
        this.file = file;
        this.occupier = null;
    }
}

export default class Board {
    static ranks: string[] = ['8', '7', '6', '5', '4', '3', '2', '1']
    static files: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    static moveRank = (curent: string, step: number) => {
        // '8' + 1 = '7'
        const curIdx = this.ranks.indexOf(curent)
        const newIdx = curIdx + step
        const newRank = this.ranks[newIdx]
        if (newRank == undefined) {
            return false
        }
        return newRank
    }
    
    static moveFile = (curent: string, step: number) => {
        // 'a' + 1 = 'b'
        const curIdx = this.files.indexOf(curent)
        const newIdx = curIdx + step
        const newFile = this.files[newIdx]
        if (newFile == undefined) {
            return false
        }
        return newFile
    }
    
    board: { [rank: string]: { [file: string]: Square } } = {}
    ranks:string[]
    files:string[]
    constructor(board:any=null) {
        this.ranks = Board.ranks
        this.files = Board.files
        if (board==null){
            for (let i = 0; i < 8; i++) {
                const r = this.ranks[i];
                this.board[r] = {};
                for (let j = 0; j < 8; j++) {
                    const f = this.files[j];
                    const c = (i + j) % 2 == 0 ? 'light' : 'dark';
                    this.board[r][f] = new Square(c, r, f);
                }
            }
        } else {
            this.board = board
        }
    }

    init() {
        for (let chessId in Chess.chessDict) {
            const meta = Chess.chessDict[chessId]
            const char = meta.character
            const make = Chess.chessMaker[char]
            let chess = new make(chessId)
            this.board[chess.rank][chess.file].occupier = chess
        }
    }

    moves = (rank: string, file: string): any => {
        let result: {
            character: (string | null),
            color: (string | null),
            moves: string[]
        } = {
            character: null,
            color: null,
            moves: []
        }
        
        const chess = this.board[rank][file].occupier
        if (chess == null) {
            return result
        }

        const char = chess.character
        const color = chess.color
        result.character = char
        result.color = color

        let moveSet = chess.moveSet
        let captureSet = chess.captureMoveSet

        if (char == 'Pawn'){
            const direction = chess.direction;
            if (rank == chess.rank && file == chess.file){
                moveSet = chess.initialMoveSet;
            }
            moveSet.map((move)=>{
                move.rank = move.rank * direction
            })
            
            captureSet.map((move)=>{
                move.rank = move.rank * direction
            })
            for (let c in captureSet){
                const action = captureSet[c]
                for (let i = 1; i<action.step+1;i++){
                    const newR = Board.moveRank(rank, action.rank*i)
                    const newF = Board.moveFile(file, action.file*i)
                    if(newR && newF){
                        const sq = this.board[newR][newF]
                        const occupier = sq.occupier
                        const id = newR + newF;
                        if (occupier != null){
                            if (occupier.color != color) {
                                result.moves.push(id)
                            }
                            break
                        }
                    }
                }
            }
        }

        for (let m in moveSet) {
            const action = moveSet[m]
            for (let i = 1; i<action.step+1;i++){
                const newR = Board.moveRank(rank, action.rank*i)
                const newF = Board.moveFile(file, action.file*i)
                if(newR && newF){
                    const sq = this.board[newR][newF]
                    const occupier = sq.occupier
                    const id = newR + newF;
                    if (occupier != null){
                        if (occupier.color != color) {
                            result.moves.push(id)
                        }
                        break
                    }
                    if (occupier == null) {
                        result.moves.push(id)
                    }
                }
            }
        }
        return result
    }

    print() {
        //print in terminal
        let strlen = 1
        let bstring = ''
        bstring += this.files.map((f) => { return `${f}` }).join(" ")
        bstring += '\n'
        bstring += '-'.repeat((strlen+1) *8)
        bstring += '\n'

        for (let i = 0; i < 8; i++) {
            let b: string[] = [];
            const r = this.ranks[i];
            for (let j = 0; j < 8; j++) {
                const f = this.files[j];
                const sq = this.board[r][f];
                if (sq.occupier == null) {
                    const c = this.board[r][f].color == 'light' ? '□'.repeat(strlen) : '■'.repeat(strlen);
                    b.push(c)
                } else {
                    const sym = sq.occupier.color == 'white' ? sq.occupier.symbol[0] : sq.occupier.symbol[1]
                    b.push(sym)
                }
            }
            bstring += b.join(" ")
            bstring += `|${this.ranks[i]}\n`
        }
        return bstring
    }

    toArray() {
        let result: {
            files: string[],
            ranks: string[],
            board: Square[][]
        } = {
            files: this.files,
            ranks: this.ranks,
            board: []
        }

        for (let i = 0; i < 8; i++) {
            let row: Square[] = [];
            const r = this.ranks[i];
            for (let j = 0; j < 8; j++) {
                const f = this.files[j];
                const sq = this.board[r][f];
                row.push(sq)
            }
            result.board.push(row)
        }
        return result
    }

    lookAt = (rank:string, file:string):(Chess.Base|null) => {
        return this.board[rank][file].occupier
    }
}