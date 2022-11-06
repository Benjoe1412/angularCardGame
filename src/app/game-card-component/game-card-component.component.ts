import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { CardData } from '../card-data';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';


@Component({
  selector: 'app-game-card-component',
  templateUrl: './game-card-component.component.html',
  styleUrls: ['./game-card-component.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none',
      })),
      state('flipped', style({
        transform: 'perspective(600px) rotateY(180deg)'
      })),
      state('matched', style({
        visibility: 'false',
        transform: 'scale(0.05)',
        opacity: 0
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ]),
      transition('* => matched', [
        animate('400ms')
      ])
    ])
  ]
})
export class GameCardComponentComponent implements OnInit {
@Input() data!: CardData;
@Output() cardClicked = new EventEmitter();
  constructor() {
    
   }

  ngOnInit(): void {
  }

}
