import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuctionItemComponent } from "../auction-item/auction-item.component";
import { CommonModule } from '@angular/common';
import { AuctionListHeaderComponent } from "../auction-list-header/auction-list-header.component";
import { PlayerFilterPipe } from '../player-filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [AuctionItemComponent, CommonModule, AuctionListHeaderComponent, PlayerFilterPipe, FormsModule],
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit{
    data: any[] = [];
    searchTerm: string = ''; 
    sortBy: string = 'Sortby Name'; 
    selectedType: string[] = [];
    filtersVisible: boolean = false; // Control filter visibility

    constructor(private httpClient: HttpClient){}

    ngOnInit(): void {
      this.fetchData(); 
    }

    onTypeChange(event: any) {
      const type = event.target.value;
      if (event.target.checked) {
        this.selectedType = [...this.selectedType, type];
      } else {
        this.selectedType = this.selectedType.filter(t => t !== type);
      }
    }

    fetchData(): void {
      this.httpClient.get<any[]>('http://localhost:5011/api/players/getallplayers').subscribe(response => {
        this.data = response; 
        console.log(response);
      });
    }

    toggleFilters(): void {
      this.filtersVisible = !this.filtersVisible;
    }
}
