import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:5011/api/players';

  private playerSubject = new BehaviorSubject<any[]>([]);
  players$ = this.playerSubject.asObservable(); 

  constructor(private httpClient: HttpClient) {

  }

  fetchPlayers(){
    this.httpClient.get(`${this.apiUrl}/getallplayers`).subscribe({
      next: (response: any) => {
        this.playerSubject.next(response); 
      }, 
      error: error => {
        console.log('Error fetching player:', error);
      }
    });
  }
}
