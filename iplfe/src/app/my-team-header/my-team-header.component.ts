import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-team-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-team-header.component.html',
  styleUrl: './my-team-header.component.css'
})
export class MyTeamHeaderComponent {
  @Input() teamName: any;
  @Input() purse: any; 
}
