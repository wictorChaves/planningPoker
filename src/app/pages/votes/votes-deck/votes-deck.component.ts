import { Component, Input, OnInit } from '@angular/core';
import { FibonacciModel }           from 'src/app/classes/fibonacci.model';
import { FibonacciSequenci }        from 'src/app/components/fibonacci-deck/constants/fibonacci.model.const';
import { IRoomModel }               from 'src/app/interfaces/i-room.model';
import { VoteService }              from 'src/app/services/vote.service';

@Component({
  selector   : 'app-votes-deck',
  templateUrl: './votes-deck.component.html',
  styleUrls  : ['./votes-deck.component.scss']
})
export class VotesDeckComponent implements OnInit {

  @Input() room: IRoomModel;
  public isOpenRisk                 = false;
  public activeCard: FibonacciModel = FibonacciSequenci.find(x => x.value == 1);

  constructor(
    private userService: VoteService,
    private voteService: VoteService
  ) { }

  ngOnInit() {
    this.voteService.listenerActiveVote(this.room.id).subscribe(vote => {
      if (vote)
        this.activeCard = vote.value;
    });
  }

  activeCardEvent(fibonacciModel: FibonacciModel) {
    fibonacciModel.emojis = [];
    this.userService.activeCardEvent(this.room, fibonacciModel);
  }

  toggleOpenRisk() {
    this.isOpenRisk = !this.isOpenRisk;
  }

}
