import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'https://iplbe-b5fyfye3gaf3dxc3.uksouth-01.azurewebsites.net/api/players';

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
