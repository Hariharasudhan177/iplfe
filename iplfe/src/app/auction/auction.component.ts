import { Component } from '@angular/core';
import { MyTeamComponent } from "../my-team/my-team.component";
import { AuctionListComponent } from "../auction-list/auction-list.component";

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [MyTeamComponent, AuctionListComponent],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.css'
})
export class AuctionComponent {

}
