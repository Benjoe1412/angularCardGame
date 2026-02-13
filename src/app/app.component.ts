import { Component, OnInit,Inject } from '@angular/core';
import { CardData } from './card-data';
import { MatDialog } from '@angular/material/dialog';
import { RestartDialogComponentComponent } from './restart-dialog-component/restart-dialog-component.component';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent  implements OnInit {
  cardImages = [
    'minta1',
    'minta2',
    'minta3',
    'minta4',
    'minta5',
    'minta6',
    'minta7',
    'minta8'
  ];
nCount : number = 8;
matchedCount:number = 0;
cards: CardData[] = [];
flippedCards: CardData[] = [];
timer:boolean = false;
timeElapsed:number = 0;
interval:any;
elem:any;
constructor(@Inject(DOCUMENT) private document: any,private dialog: MatDialog){
  
}

ngOnInit(): void{
  this.setupCards();
  this.elem = document.documentElement;
  
}

setupCards(): void {
  this.cards = [];
  const n = this.nCount;

  const list = this.cardImages
  .map(x => ({ x, r: Math.random() }))
  .sort((a, b) => a.r - b.r)
  .map(a => a.x)
  .slice(0, n).forEach((image) => {
    const cardData: CardData = {
      imageId: image,
      state: 'default'
    };

    this.cards.push({ ...cardData });
    this.cards.push({ ...cardData });
 
  });

  this.cards = this.shuffleArray(this.cards);
}
shuffleArray(anArray: any[]): any[] {
  return anArray.map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);
}
cardClicked(index: number): void {
  const cardInfo = this.cards[index];
  if(!this.timer){
    this.timer = !this.timer;
this.startTimer();
  }
  if (cardInfo.state === 'default' && this.flippedCards.length < 2)      
  {
    cardInfo.state = 'flipped';
    this.flippedCards.push(cardInfo);

    if (this.flippedCards.length === 2) {
      this.checkForCardMatch();
   }

  } else if (cardInfo.state === 'flipped') {
    cardInfo.state = 'default';
    this.flippedCards.pop();

  }
}
checkForCardMatch(): void {
  setTimeout(() => {
    const cardOne = this.flippedCards[0];
    const cardTwo = this.flippedCards[1];
    const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
    cardOne.state = cardTwo.state = nextState;

    this.flippedCards = [];

    if (nextState === 'matched') {
      this.matchedCount++;

      if (this.matchedCount === this.nCount) {
        this.pauseTimer();

        this.timer = false;
        const dialogRef = this.dialog.open(RestartDialogComponentComponent, {
          disableClose: true,
          data:{'Pontszam':this.timeElapsed}
        });

        dialogRef.afterClosed().subscribe(() => {
         
          this.restart();
        });
        this.timeElapsed =0;
      }
    }

  }, 1000);
}
restart(): void {
  this.matchedCount = 0;
  this.setupCards();
}
startTimer() {
  this.interval = setInterval(() => {
    this.timeElapsed++;
  },1000)
}

pauseTimer() {
  clearInterval(this.interval);
}
openFullscreen() {
  if (this.elem.requestFullscreen) {
    this.elem.requestFullscreen();
  } else if (this.elem.mozRequestFullScreen) {
    /* Firefox */
    this.elem.mozRequestFullScreen();
  } else if (this.elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    this.elem.webkitRequestFullscreen();
  } else if (this.elem.msRequestFullscreen) {
    /* IE/Edge */
    this.elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
closeFullscreen() {
  if (this.document.exitFullscreen) {
    this.document.exitFullscreen();
  } else if (this.document.mozCancelFullScreen) {
    /* Firefox */
    this.document.mozCancelFullScreen();
  } else if (this.document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    this.document.webkitExitFullscreen();
  } else if (this.document.msExitFullscreen) {
    /* IE/Edge */
    this.document.msExitFullscreen();
  }
}
}
