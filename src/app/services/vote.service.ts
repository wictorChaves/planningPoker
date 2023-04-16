import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FibonacciModel } from '../classes/fibonacci.model';
import { IRoomModel } from '../interfaces/i-room.model';
import { IVoteModel } from '../interfaces/i-vote.model';
import { RoomService } from './room.service';
import { UserService } from './user.service';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private user?: firebase.User | null;

  constructor(
    private userService: UserService,
    private roomService: RoomService
  ) {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser().subscribe((user: firebase.User | null) => { this.user = user; })
  }

  activeCardEvent(room: IRoomModel, fibonacciModel: FibonacciModel) {
    var vote = this.getUserVote(room);
    if (this.hasVote(vote)) this.removeVote(room, vote);
    this.addVote(room, fibonacciModel);
  }

  getUserVote(room: IRoomModel): IVoteModel | undefined {
    return room?.votes?.find(p => p.uid == this.user?.uid);
  }

  removeVote(room: IRoomModel, vote: IVoteModel | undefined) {
    this.updatePartialRoom(room, { votes: arrayRemove(vote) as unknown as IVoteModel[] });
  }

  addVote(room: IRoomModel, fibonacciModel: FibonacciModel) {
    this.updatePartialRoom(room, {
      votes: arrayUnion({ uid: this.user?.uid, displayName: this.user?.displayName, value: fibonacciModel, isRedCard: this.getRandomBooleanValue() }) as unknown as IVoteModel[]
    });
  }

  hasVote(vote: IVoteModel | undefined) {
    return vote != undefined || vote != null;
  }

  updatePartialRoom(room: IRoomModel, partialRoom: any): void {
    this.roomService.updatePartialRoom(partialRoom, room?.id?.toString() ?? "");
  }

  getRandomBooleanValue(): boolean {
    return (Math.random()) < 0.5;
  }

  listenerActiveVote(roomId: string) {
    return this.roomService.listenerRoom(roomId).pipe(map((room?: IRoomModel) => {
      return room?.votes?.find(x => x.uid == this.user?.uid);
    }))
  }

}
