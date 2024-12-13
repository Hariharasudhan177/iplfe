import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  teamName = '';

  constructor(private authenticationService: AuthenticationService){
    this.authenticationService.authData$.subscribe(authData =>{
      this.teamName = this.authenticationService.getTeamNameFromToken(authData);
    });
  }
}
