import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eleven-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eleven-item.component.html',
  styleUrl: './eleven-item.component.css'
})
export class ElevenItemComponent {
  @Input() player: any; 
  @Input() index: number = 0; 
  @Output() move = new EventEmitter<boolean>(); 

  moveUp(): any{
    this.move.emit(true); 
  }

  moveDown(): any{
    this.move.emit(false); 
  }
}
