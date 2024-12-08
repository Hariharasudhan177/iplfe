import { Component, Input} from '@angular/core';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-auction-item',
  standalone: true,
  imports: [],
  templateUrl: './auction-item.component.html',
  styleUrl: './auction-item.component.css'
})
export class AuctionItemComponent {
  @Input() player: any; 

  constructor(private auctionService : AuctionService){

  }

  selectPlayer(): void{
    this.auctionService.addPlayerToTeam(this.player); 
  }
}