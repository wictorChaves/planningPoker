import { Component, Input, OnInit } from '@angular/core';
import { IRoomModel }               from 'src/app/interfaces/i-room.model';

@Component({
  selector   : 'app-votes-cards',
  templateUrl: './votes-cards.component.html',
  styleUrls  : ['./votes-cards.component.scss']
})
export class VotesCardsComponent implements OnInit {

  @Input() isFlip: boolean = false;
  @Input() room  : IRoomModel;
  public emojiTitle = [
    'O que fazer',
    'Como fazer',
    'Desenvolver',
    'Reproduzir'
  ]

  constructor() { }

  ngOnInit() {
  }

}
