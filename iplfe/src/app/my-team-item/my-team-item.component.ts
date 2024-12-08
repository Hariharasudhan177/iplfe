import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-my-team-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-team-item.component.html',
  styleUrl: './my-team-item.component.css'
})
export class MyTeamItemComponent {
  @Input() player: any; 

  constructor(private auctionService: AuctionService){

  }

  deletePlayer(player: any): void{
    this.auctionService.deletePlayerFromTeam(player); 
  }
}
