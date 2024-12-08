import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-team-details',
  standalone: true,
  imports: [],
  templateUrl: './my-team-details.component.html',
  styleUrl: './my-team-details.component.css'
})
export class MyTeamDetailsComponent {
  @Input() team: any[] = [];

  get noOfBatters(): number{
    return this.team.filter(player => player.isBatter).length; 
  }

  get noOfBowlers(): number{
    return this.team.filter(player => player.isBowler).length;
  }

  get noOfAllRounders(): number{
    return this.team.filter(player => player.isAllRounder).length; 
  }

  get noOfWicketKeepers(): number{
    return this.team.filter(player => player.isWicketKeeperBatsman).length; 
  }

  get noOfForeigners(): number{
    return this.team.filter(player => player.isForeigner).length; 
  }
}
