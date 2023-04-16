import { Component, Input, OnInit } from '@angular/core';
import { IRoomModel } from 'src/app/interfaces/i-room.model';
import { EmojisModel } from '../constants/emojis.model.const';

@Component({
  selector: 'app-votes-cards',
  templateUrl: './votes-cards.component.html',
  styleUrls: ['./votes-cards.component.scss']
})
export class VotesCardsComponent implements OnInit {

  @Input() isFlip: boolean = false;
  @Input() room?: IRoomModel;

  public emojisAndDescriptions = EmojisModel;

  getTitle(emoji: string) {
    var emojiAndDescription = this.emojisAndDescriptions.find(x => x.emoji == emoji);
    return emojiAndDescription ? emojiAndDescription.description : "";
  }

  constructor() { }

  ngOnInit() {
  }

}
