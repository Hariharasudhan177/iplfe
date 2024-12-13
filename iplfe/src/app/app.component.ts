import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuctionComponent } from "./auction/auction.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuctionComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Fantasy League 2025';
}
