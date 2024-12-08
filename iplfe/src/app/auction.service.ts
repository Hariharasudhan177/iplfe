import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private playerSelectedSubject = new Subject<any>(); 
  playerSelected$ = this.playerSelectedSubject.asObservable(); 

  private playerDeletedSubject = new Subject<any>(); 
  playerDeleted$ = this.playerDeletedSubject.asObservable(); 

  constructor() { }

  addPlayerToTeam(player: any): void{
    console.log(`Requesting ${player.name} to the team`); 
    this.playerSelectedSubject.next(player); 
  }

  deletePlayerFromTeam(player: any): void{
    console.log(`Requesting ${player.name} to the team`); 
    this.playerDeletedSubject.next(player); 
  }
}
