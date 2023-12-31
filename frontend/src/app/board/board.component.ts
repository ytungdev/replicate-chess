import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


interface Chess {
    id: string
    color: string;
    character: string;
    rank: string;
    file: string;
    moveSet: any[];
}

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
    user: { sex: string } = { sex: 'F' }
    board: any = {};
    ranks: string[] = [];
    files: string[] = [];
    
    highlx: string[] = []
    promote: string[] = []
    selected: string = ''

    winner:string = ''

    constructor(private http: HttpService) { }

    reset() {
        this.selected = '';
        this.highlx = [];
        this.promote = []
    }

    select(r: string, f: string): void {
        if (r + f == this.selected) {
            //deselect
            this.reset()
            return
        }
        if (this.highlx.includes(r + f)) {
            //move
            this.move(this.selected.substring(0, 1), this.selected.substring(1, 2), r, f)
        } else {
            //select and check moves
            this.selected = r + f;
            this.http.postMove(this.board, r, f).subscribe((data => {
                this.highlx = data.moves;
                this.promote = data.promote;
            }))
        }
    }

    move(fr: string, ff: string, tr: string, tf: string): void {
        let fsq = this.board[fr][ff]
        let tsq = this.board[tr][tf]
        let chess: (Chess | null) = null;
        const moveTo = () => {
            fsq.occupier = null;
            tsq.occupier = chess
            if(this.promote.includes(tr+tf)){
                alert('PROMOTION!!')
            }
            this.reset()
        }

        if (fsq == null) {
            //no chess to move
            console.log(`${ff}${fr} > ${tf}${tr} : no chess`)
        } else {
            chess = fsq.occupier;
        }

        if (tsq.occupier == null) {
            //move chess to empty sq
            moveTo()
            console.log(`${ff}${fr} > ${tf}${tr} : to empty`)
        } else {
            if (tsq.color != chess?.color) {
                console.log(`${ff}${fr} > ${tf}${tr} : capture`)
                if (tsq.occupier.character == 'King'){
                    this.winner = chess?.color || ''
                }
                moveTo()
            }
            if (tsq.color == chess?.color) {
                console.log(`${ff}${fr} > ${tf}${tr} : block`)
            }
        }
    }


    showBoard() {
        this.http.getBoard().subscribe((data => {
            this.board = data.board
            this.ranks = data.ranks;
            this.files = data.files;
            console.log(this.board)
        }))
    }

    ngOnInit(): void {
        this.showBoard()
    }
}
