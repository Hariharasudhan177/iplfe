import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyTeamItemComponent } from "../my-team-item/my-team-item.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuctionService } from '../auction.service';
import { MyTeamHeaderComponent } from "../my-team-header/my-team-header.component";
import { MyTeamDetailsComponent } from "../my-team-details/my-team-details.component";
import { PlayerService } from '../player.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-my-team',
  standalone: true,
  imports: [MyTeamItemComponent, CommonModule, MyTeamHeaderComponent, MyTeamDetailsComponent],
  templateUrl: './my-team.component.html',
  styleUrl: './my-team.component.css'
})
export class MyTeamComponent implements OnInit, OnDestroy{
  data: any[] = [];
  team: any[] = []; 
  purse = 120; 

  private playerSelectedSubscription: Subscription | null = null; 
  private playerDeletedSubscription: Subscription | null = null; 

  constructor(private auctionService: AuctionService, 
    private playerService: PlayerService,
    private teamService: TeamService){
  }

  ngOnInit(): void {

    this.playerService.players$.subscribe(players => {
      this.data = players; 
      if(this.data.length > 0) this.teamService.getTeam(); 
    });

    this.teamService.team$.subscribe(team => {
      this.team = []; 
      team.forEach(t => this.team = [...this.team, this.data.find(p => p.id === t.playerId)]);
      this.updatePurse(); 
    });


    this.playerSelectedSubscription = this.auctionService.playerSelected$.subscribe(
      (player: any) => {
        if(this.isPlayerSelectionValid(player)){
          this.teamService.addPlayer(player.id, this.team.length);
        }
      }
    ); 

    this.playerDeletedSubscription = this.auctionService.playerDeleted$.subscribe(
      (player: any) => {
        this.teamService.deletePlayer(player.id);
      }
    );
  }

  ngOnDestroy(): void {
    if(this.playerSelectedSubscription){
      this.playerSelectedSubscription.unsubscribe(); 
    }

    if(this.playerDeletedSubscription){
      this.playerDeletedSubscription.unsubscribe(); 
    }
  }

  isPlayerSelectionValid(player: any): boolean{
    if(this.team.length > 25){
      alert('Only 25 players can be selected in the squad.');
      return false; 
    }

    var selected = false; 
    var total = 0; 
    var foreigners = 0; 

    this.team.forEach(p =>{
      if(p.id === player.id) selected = true; 
      total += p.price; 
      foreigners += p.isForeigner ? 1 : 0; 
    });
    
    total += player.price;
    foreigners += player.isForeigner ? 1 : 0; 

    if(selected){
      alert(`${player.name} is already in the squad.`); 
      return false; 
    }

    if(total > 120){
      alert(`Adding ${player.name} would go above the budget of 120 crores.`); 
      return false;
    }

    if(foreigners > 8){
      alert(`${player.name} is a foreign player. Only 8 foreign players allowed in the squad.`);
      return false; 
    }

    return true; 
  }

  updatePurse(): void{
    this.purse = 120 - this.team.reduce((sum, player) => sum + player.price, 0);
  }

  saveTeamToLocalStorage(): void{
    localStorage.setItem('savedTeam', JSON.stringify(this.team)); 
  }

  getTeamFromLocalStorage(): any{
    return localStorage.getItem('savedTeam'); 
  }
}
