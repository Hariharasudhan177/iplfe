import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService{

  private apiUrl = 'http://localhost:5011/api/team';

  private userId = '';

  data: any[] = []; 
  private teamSubject = new BehaviorSubject<any[]>([]); 
  team$ = this.teamSubject.asObservable(); 

  constructor(private httpClient: HttpClient, 
    private authenticationService: AuthenticationService,
    private playerService: PlayerService) {
    this.authenticationService.authData$.subscribe(authData => {
      this.userId = this.authenticationService.getIdFromToken(authData); 
      this.playerService.fetchPlayers(); 
    });

    this.playerService.players$.subscribe(players =>{
      this.data = players; 
      if(this.data.length > 0) this.getTeam(); 
    });
  }

  getTeam(){
    if(this.userId === ""){
      this.teamSubject.next(this.getTeamFromLocalStorage());
      return; 
    }

    const params = { userId: this.userId };
    this.httpClient.get(`${this.apiUrl}/getteam`, {params}).subscribe({
      next : (response: any) => {
        this.teamSubject.next(response); 
        if(response.length <= 0){
          this.sendTeamFromLocalStorage(); 
        }
      }
    });
  }

  addPlayer(playerId: number, order: number){
    if(this.userId === ""){
      var savedTeam = this.getTeamFromLocalStorage(); 
      savedTeam.push({playerId: playerId, order: order}); 
      this.setTeamToLocalStorage(savedTeam);
      this.teamSubject.next(savedTeam);
      return; 
    }

    var playerToSend = {
      PlayerId: playerId,
      UserId: this.userId,
      Order: order
    }; 

    return this.httpClient.post(`${this.apiUrl}/addplayer`, playerToSend).subscribe({
      next: response =>{
        this.playerService.fetchPlayers(); 
      }
    });
  }

  updatePlayer(playerId: number, order: number){
    console.log(playerId + ' ' + order);
    if(this.userId === ""){
      var savedTeam = this.getTeamFromLocalStorage();
      savedTeam.map((p:{playerId: number; order: number}) => {
        if(p.playerId === playerId){
          p.order = order; 
        }
        return p; 
      }); 
      this.setTeamToLocalStorage(savedTeam);
      savedTeam.sort((
        a:{playerId: number, order: number},
        b:{playerId: number, order: number}
      ) => a.order - b.order); 
      this.teamSubject.next(savedTeam);
      return; 
    }

    var playerToSend = {
      PlayerId: playerId,
      UserId: this.userId,
      Order: order
    }; 

    return this.httpClient.post(`${this.apiUrl}/updateplayer`, playerToSend).subscribe({
      next: response =>{
        this.playerService.fetchPlayers(); 
      }
    });
  }

  deletePlayer(playerId: number){
    if(this.userId === ""){
      var savedTeam = this.getTeamFromLocalStorage(); 
      savedTeam = savedTeam.filter((p: {playerId: number; order: number}) => {
        return p.playerId !== playerId
      });
      this.setTeamToLocalStorage(savedTeam);
      savedTeam.sort((
        a:{playerId: number, order: number},
        b:{playerId: number, order: number}
      ) => a.order - b.order); 
      this.teamSubject.next(savedTeam);
      return; 
    }

    var playerToSend = {
      PlayerId: playerId,
      UserId: this.userId,
      Order: 1
    }; 

    return this.httpClient.post(`${this.apiUrl}/deleteplayer`, playerToSend).subscribe({
      next: response =>{
        this.playerService.fetchPlayers(); 
      }
    });
  }  

  getTeamFromLocalStorage(): any{
    var savedTeam = localStorage.getItem('savedTeam');
    return savedTeam === null ? [] : 
    JSON.parse(savedTeam).sort
    ((a : {playerId: number; order: number},
       b : {playerId: number; order: number}) => a.order - b.order); 
  }

  removeTeamFromLocalStorage(): any{
    localStorage.removeItem('savedTeam');
  }

  setTeamToLocalStorage(team: any[]): any{
    localStorage.setItem('savedTeam', JSON.stringify(team)); 
  }

  sendTeamFromLocalStorage(): any{
    var savedTeam = this.getTeamFromLocalStorage();
    savedTeam.forEach((p: {playerId: number; order: number}, index: number)=> {
      var playerToSend = {
        PlayerId: p.playerId,
        UserId: this.userId,
        Order: p.order
      }; 

      this.httpClient.post(`${this.apiUrl}/addPlayer`, playerToSend).subscribe({
        next: response => {
          if(index + 1 === savedTeam.length){
            this.getTeam();  
          }
        }
      });
    });

    this.removeTeamFromLocalStorage(); 
  }
}
