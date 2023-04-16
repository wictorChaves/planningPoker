import { Component, Input, OnInit } from '@angular/core';
import { IRoomModel } from 'src/app/interfaces/i-room.model';

@Component({
  selector: 'app-votes-average',
  templateUrl: './votes-average.component.html',
  styleUrls: ['./votes-average.component.scss']
})
export class VotesAverageComponent implements OnInit {

  @Input() room?: IRoomModel;

  constructor() { }

  ngOnInit() {
  }

  isHeart(average: string) {
    return Number(average) <= 3;
  }

  isDiamond(average: string) {
    return Number(average) > 3 && Number(average) <= 10;
  }

  isSpade(average: string) {
    return Number(average) > 10;
  }

}
