import { Component, Input, OnInit } from '@angular/core';
import * as firebase                from 'firebase/app';
import { User }                     from 'firebase/app';
import { FibonacciModel }           from 'src/app/classes/fibonacci.model';
import { IRoomModel }               from 'src/app/interfaces/i-room.model';
import { IVoteModel }               from 'src/app/interfaces/i-vote.model';
import { RoomService }              from 'src/app/services/room.service';
import { UserService }              from 'src/app/services/user.service';

@Component({
  selector   : 'app-votes-deck',
  templateUrl: './votes-deck.component.html',
  styleUrls  : ['./votes-deck.component.scss']
})
export class VotesDeckComponent implements OnInit {

  @Input () room: IRoomModel;
  private user  : User;

  constructor(
    public  userService: UserService,
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser().subscribe(user => { this.user = user; })
  }

  activeCardEvent(fibonacciModel: FibonacciModel) {
    var vote = this.getUserVote();
    if (this.hasVote(vote)) this.removeVote(vote);
    this.addVote(fibonacciModel);
  }

  getUserVote() {
    return this.room.votes.find(p => p.uid == this.user.uid);
  }

  removeVote(vote: IVoteModel) {
    this.updatePartialRoom({ votes: firebase.firestore.FieldValue.arrayRemove(vote) as unknown as IVoteModel[] });
  }

  addVote(fibonacciModel: FibonacciModel) {
    this.updatePartialRoom({
      votes: firebase.firestore.FieldValue.arrayUnion({ uid: this.user.uid, displayName: this.user.displayName, value: fibonacciModel }) as unknown as IVoteModel[]
    });
  }

  hasVote(vote: IVoteModel) {
    return vote != undefined || vote != null;
  }

  updatePartialRoom(partialRoom: any): void {
    this.roomService.updatePartialRoom(partialRoom, this.room.id.toString());
  }

}
