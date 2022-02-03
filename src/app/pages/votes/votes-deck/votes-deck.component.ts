import { Component, Input, OnInit } from '@angular/core';
import { FibonacciModel }           from 'src/app/classes/fibonacci.model';
import { IRoomModel }               from 'src/app/interfaces/i-room.model';
import { VoteService }              from 'src/app/services/vote.service';

@Component({
  selector   : 'app-votes-deck',
  templateUrl: './votes-deck.component.html',
  styleUrls  : ['./votes-deck.component.scss']
})
export class VotesDeckComponent implements OnInit {

  @Input() room: IRoomModel;
  public isOpenRisk = false;

  constructor(private userService: VoteService) { }

  ngOnInit() {
  }

  activeCardEvent(fibonacciModel: FibonacciModel) {
    this.userService.activeCardEvent(this.room, fibonacciModel);
  }

  toggleOpenRisk() {
    this.isOpenRisk = !this.isOpenRisk;
  }

}
