import { Injectable }     from '@angular/core';
import * as firebase      from 'firebase/app';
import { User }           from 'firebase/app';
import { FibonacciModel } from '../classes/fibonacci.model';
import { IRoomModel }     from '../interfaces/i-room.model';
import { IVoteModel }     from '../interfaces/i-vote.model';
import { RoomService }    from './room.service';
import { UserService }    from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private user: User;

  constructor(
    private userService: UserService,
    private roomService: RoomService
  ) {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser().subscribe(user => { this.user = user; })
  }

  activeCardEvent(room: IRoomModel, fibonacciModel: FibonacciModel) {
    var vote = this.getUserVote(room);
    if (this.hasVote(vote)) this.removeVote(room, vote);
    this.addVote(room, fibonacciModel);
  }

  getUserVote(room: IRoomModel) {
    return room.votes.find(p => p.uid == this.user.uid);
  }

  removeVote(room: IRoomModel, vote: IVoteModel) {
    this.updatePartialRoom(room, { votes: firebase.firestore.FieldValue.arrayRemove(vote) as unknown as IVoteModel[] });
  }

  addVote(room: IRoomModel, fibonacciModel: FibonacciModel) {
    this.updatePartialRoom(room, {
      votes: firebase.firestore.FieldValue.arrayUnion({ uid: this.user.uid, displayName: this.user.displayName, value: fibonacciModel, isRedCard: this.getRandomBooleanValue() }) as unknown as IVoteModel[]
    });
  }

  hasVote(vote: IVoteModel) {
    return vote != undefined || vote != null;
  }

  updatePartialRoom(room: IRoomModel, partialRoom: any): void {
    this.roomService.updatePartialRoom(partialRoom, room.id.toString());
  }

  getRandomBooleanValue(): boolean {
    return (Math.random()) < 0.5;
  }

}
