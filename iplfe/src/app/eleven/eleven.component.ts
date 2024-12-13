import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElevenHeaderComponent } from "../eleven-header/eleven-header.component";
import { ElevenItemComponent } from "../eleven-item/eleven-item.component";
import { JsonPipe } from '@angular/common';
import { ElevenCheckComponent } from "../eleven-check/eleven-check.component";
import { TeamService } from '../team.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-eleven',
  standalone: true,
  imports: [ElevenHeaderComponent, ElevenItemComponent, CommonModule, ElevenCheckComponent],
  templateUrl: './eleven.component.html',
  styleUrl: './eleven.component.css'
})
export class ElevenComponent implements OnInit{

  data: any[] = []; 
  team: any[] = []; 

  constructor(private playerService: PlayerService, private teamService: TeamService){

  }

  ngOnInit(): void {
    //this.getTeamFromLocalStorage(); 
    this.playerService.players$.subscribe(players => {
      this.data = players; 
      if(this.data.length > 0) this.teamService.getTeam(); 
    });

    //this.playerService.fetchPlayers(); 

    this.teamService.team$.subscribe(team => {
      this.team = team.map(t => this.data.find(p => p.id === t.playerId)); // Update team all at once
    });
  }

  movePlayer(index: number, up: boolean): void{
    if(up && index > 0){
      this.teamService.updatePlayer(this.team[index].id, index-1);
      this.teamService.updatePlayer(this.team[index-1].id, index);
      //[this.team[index], this.team[index-1]] = [this.team[index-1], this.team[index]];
      //this.setTeamToLocalStorage(); 
    }else if(!up && index < this.team.length - 1){
      this.teamService.updatePlayer(this.team[index].id, index+1);
      this.teamService.updatePlayer(this.team[index+1].id, index);
      //[this.team[index], this.team[index+1]] = [this.team[index+1], this.team[index]]
      //this.setTeamToLocalStorage(); 
    }
  }

  setTeamToLocalStorage(): any{
    localStorage.setItem('savedTeam', JSON.stringify(this.team));
  }

  getTeamFromLocalStorage(): void{
    var savedTeam = localStorage.getItem('savedTeam'); 
    if(savedTeam){
      this.team = JSON.parse(savedTeam);
    }
  }
}
