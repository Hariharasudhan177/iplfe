import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerFilter',
  standalone: true
})
export class PlayerFilterPipe implements PipeTransform {

  transform(players: any[], searchTerm: string, sortBy: string, selectedType: string[]): any[] {
    if(!players){
      return []; 
    }

    let filtered = players; 

    if(searchTerm){
      const term = searchTerm.toLowerCase(); 
      filtered = filtered.filter(player => player.name.toLowerCase().includes(term)); 
    }

    if(selectedType && selectedType.length > 0){
      filtered = filtered.filter(player => {
        return selectedType.every(type => {
          switch(type) {
            case 'BAT': return player.isBatter;
            case 'BOWL': return player.isBowler;
            case 'AR': return player.isAllRounder;
            case 'WKBAT': return player.isWicketKeeperBatsman;
            case 'FOR': return player.isForeigner;
            case 'IND': return !player.isForeigner;
            case 'Opening-batter': return player.isOpener;
            case 'Top/Middle-order-batter': return player.isMiddle;
            case 'Finisher': return player.isFinisher;
            case 'Spin-bowler': return player.isSpinner;
            case 'Fast-bowler': return player.isFastBowler;
            case 'Newball-bowler': return player.isNewball;
            case 'Death-bowler': return player.isDeath;
            case 'Dependable-bowler': return player.isDependable;
            default: return false;
          }
        });
      });
    }

    if(sortBy === 'Sortby Name'){
      filtered.sort((a,b) => a.name.localeCompare(b.name)); 
    }else if(sortBy === 'Sortby Price'){
      filtered.sort((a,b) => b.price - a.price); 
    }

    return filtered; 
  }
}