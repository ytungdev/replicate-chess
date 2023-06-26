import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getBoard(){
    return this.http.get<any>('/api/board')
  }


  postMove(board:any, r:string,f:string){
    return this.http.post<any>(`/api/board/moves/`, {board:board, r:r, f:f})
  }

}
