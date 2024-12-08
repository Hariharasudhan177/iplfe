import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eleven-check',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eleven-check.component.html',
  styleUrl: './eleven-check.component.css'
})
export class ElevenCheckComponent implements OnInit{
  @Input() team: any[] = []; 

  noOfForeignPlayers = 0;
  foreignPlayers: any[] = []; 
  maximumFourForiegnPlayers = false; 

  noOfWicketKeepers = 0;
  wicketKeepers: any[] = [];
  minimumOneWicketKeeper = false; 

  noOfOpeners = 0;
  openers: any[] = [];
  minimumTwoOpeners = false; 
  maximumThreeOpeners = false;

  noOfMiddlers = 0;
  middlers: any[] = [];
  minimumTwoMiddles = false; 

  noOfFinishers = 0;
  finishers: any[] = []; 
  minimumTwoFinishers = false;

  noOfSpinBowlers = 0;
  spinBowlers: any[] = [];
  minimumTwoSpinBowlers = false; 

  noOfFastBowlers = 0;
  fastBowlers: any[] = [];
  minimumTwoFastBowlers = false;  

  noofNewballBowlers = 0;
  newballBowlers: any[] = [];
  minimumTwoNewballBowlers = false; 

  noOfDeathBowlers = 0;
  deathBowlers: any[] = [];
  minimumTwoDeathBowlers = false; 

  noOfDependableBowlers = 0;
  dependableBowlers: any[] = []; 
  minimumFourDependableBowlers = false;

  noOfDependableSpinBowlers = 0;
  dependableSpinBowlers: any[] = [];
  minimumOneDependableSpinBowler = false; 

  noofDependableFastBowlers = 0;
  dependableFastBowlers: any[] = []; 
  minimumOneDependableFastBowler = false;  

  playingXIready = false; 

  ngOnInit(): void {
    this.checkPlayingXI();
  }

  checkPlayingXI(): void{
    
    this.noOfForeignPlayers = 0;
    this.noOfWicketKeepers = 0; 
    this.noOfOpeners = 0; 
    this.noOfMiddlers = 0;
    this.noOfFinishers = 0; 
    this.noOfSpinBowlers = 0; 
    this.noOfFastBowlers = 0; 
    this.noofNewballBowlers = 0; 
    this.noOfDeathBowlers = 0; 
    this.noOfDependableBowlers = 0; 
    this.noOfDependableSpinBowlers = 0; 
    this.noofDependableFastBowlers = 0; 

    this.foreignPlayers = [];
    this.wicketKeepers = []; 
    this.openers = []; 
    this.middlers = [];
    this.finishers = []; 
    this.spinBowlers = []; 
    this.fastBowlers = []; 
    this.newballBowlers = []; 
    this.deathBowlers = []; 
    this.dependableBowlers = []; 
    this.dependableSpinBowlers = []; 
    this.dependableFastBowlers = []; 

    this.team.slice(0, Math.min(this.team.length, 11)).forEach(
      player => {
        if(player.isForeigner){
          this.noOfForeignPlayers += 1; 
          this.foreignPlayers = [...this.foreignPlayers, player];
        }

        if(player.isWicketKeeperBatsman){
          this.noOfWicketKeepers += 1; 
          this.wicketKeepers = [...this.wicketKeepers, player];
        }

        if(player.isOpener){
          this.noOfOpeners += 1; 
          this.openers = [...this.openers, player];
        }

        if(player.isMiddle){
          this.noOfMiddlers += 1; 
          this.middlers = [...this.middlers, player];
        }

        if(player.isFinisher){
          this.noOfFinishers += 1; 
          this.finishers = [...this.finishers, player];
        }

        if(player.isSpinner){
          this.noOfSpinBowlers += 1; 
          this.spinBowlers = [...this.spinBowlers, player];
        }

        if(player.isFastBowler){
          this.noOfFastBowlers += 1; 
          this.fastBowlers = [...this.fastBowlers, player];
        }

        if(player.isNewball){
          this.noofNewballBowlers += 1; 
          this.newballBowlers = [...this.newballBowlers, player];
        }

        if(player.isDeath){
          this.noOfDeathBowlers += 1; 
          this.deathBowlers = [...this.deathBowlers, player];
        }

        if(player.isDependable){
          this.noOfDependableBowlers += 1; 
          this.dependableBowlers = [...this.dependableBowlers, player];
        }

        if(player.isDependable && player.isSpinner){
          this.noOfDependableSpinBowlers += 1; 
          this.dependableSpinBowlers = [...this.dependableSpinBowlers, player];
        }

        if(player.isDependable && player.isFastBowler){
          this.noofDependableFastBowlers += 1; 
          this.dependableFastBowlers = [...this.dependableFastBowlers, player];
        }
      }
    ); 

    this.maximumFourForiegnPlayers = this.noOfForeignPlayers <= 4; 
    this.minimumOneWicketKeeper = this.noOfWicketKeepers >= 1; 
    this.minimumTwoOpeners = this.noOfOpeners >= 2; 
    this.maximumThreeOpeners = this.noOfOpeners < 4; 
    this.minimumTwoMiddles = this.noOfMiddlers >= 2; 
    this.minimumTwoFinishers = this.noOfFinishers >= 2; 
    this.minimumTwoSpinBowlers = this.noOfSpinBowlers >= 2; 
    this.minimumTwoFastBowlers = this.noOfFastBowlers >= 2; 
    this.minimumTwoNewballBowlers = this.noofNewballBowlers >= 2; 
    this.minimumTwoDeathBowlers = this.noOfDeathBowlers >= 2; 
    this.minimumFourDependableBowlers = this.noOfDependableBowlers >= 4; 
    this.minimumOneDependableFastBowler = this.noofDependableFastBowlers >= 1; 
    this.minimumOneDependableSpinBowler = this.noOfDependableSpinBowlers >= 1; 

    this.playingXIready = this.maximumFourForiegnPlayers &&
    this.minimumOneWicketKeeper && 
    this.minimumTwoOpeners && 
    this.maximumThreeOpeners &&
    this.minimumTwoMiddles && 
    this.minimumTwoFinishers && 
    this.minimumTwoSpinBowlers && 
    this.minimumTwoFastBowlers && 
    this.minimumTwoNewballBowlers && 
    this.minimumTwoDeathBowlers && 
    this.minimumFourDependableBowlers && 
    this.minimumOneDependableFastBowler && 
    this.minimumOneDependableSpinBowler; 
  }

  listPlayers(list: any[]): void{
    alert(list.reduce((result, player, index) => {
      return index === 0 ? player.name : result + ',' + player.name; 
    }, '')); 
  }
}
