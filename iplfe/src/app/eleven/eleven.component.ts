import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElevenHeaderComponent } from "../eleven-header/eleven-header.component";
import { ElevenItemComponent } from "../eleven-item/eleven-item.component";
import { JsonPipe } from '@angular/common';
import { ElevenCheckComponent } from "../eleven-check/eleven-check.component";

@Component({
  selector: 'app-eleven',
  standalone: true,
  imports: [ElevenHeaderComponent, ElevenItemComponent, CommonModule, ElevenCheckComponent],
  templateUrl: './eleven.component.html',
  styleUrl: './eleven.component.css'
})
export class ElevenComponent implements OnInit{

  team: any[] = []; 

  ngOnInit(): void {
    var savedTeam = this.getTeamFromLocalStorage();
    if(savedTeam){
      this.team = JSON.parse(savedTeam);
    }
  }

  movePlayer(index: number, up: boolean): void{
    if(up && index > 0){
      [this.team[index], this.team[index-1]] = [this.team[index-1], this.team[index]];
      this.setTeamToLocalStorage(); 
    }else if(!up && index < this.team.length - 1){
      [this.team[index], this.team[index+1]] = [this.team[index+1], this.team[index]]
      this.setTeamToLocalStorage(); 
    }
  }

  setTeamToLocalStorage(): any{
    localStorage.setItem('savedTeam', JSON.stringify(this.team));
  }

  getTeamFromLocalStorage(): any{
    return localStorage.getItem('savedTeam');
  }
}
