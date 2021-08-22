import { RoomModel }                                  from './../rooms/model/room.model';
import { Component, OnInit }                          from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute }                             from '@angular/router';
import { AngularFireAuth }                            from '@angular/fire/auth';
import { FibonacciModel }                             from 'src/app/models/fibonacci.model';
import * as firebase                                  from 'firebase';
import { VoteModel }                                  from '../rooms/model/vote.model';
import { of, Subject }                                from 'rxjs';
import { debounceTime }                               from 'rxjs/operators';

@Component({
  selector   : 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls  : ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  public room  : RoomModel;
  public isFlip: boolean = false;

  private roomId = '';
  private roomDoc: AngularFirestoreDocument<RoomModel>;
  private user   : any;
  private flipEvent = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private afs  : AngularFirestore,
    public  auth : AngularFireAuth
  ) {
    this.roomId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadRoom();
    this.flipEvent.pipe(debounceTime(50)).subscribe(isFlip => this.isFlip = isFlip);
  }

  loadRoom() {
    this.roomDoc = this.afs.doc<RoomModel>('rooms/' + this.roomId);
    this.roomDoc.valueChanges().subscribe(room => {
      this.room = room;
      this.flipEvent.next(this.room.isFlip);
      this.includeUserRoom();
    })
  }

  //#region Include Room

  async includeUserRoom() {
    var userSubscription = this.auth.user.subscribe(user => {
      this.user = user;
      this.addIfNotExist();
      userSubscription.unsubscribe();
    })
  }

  addIfNotExist() {
    var existParticipant = this.room.participants.find(p => p.uid == this.user.uid) != undefined;

    if (!existParticipant) {
      this.addParticipant();
    }
  }

  addParticipant() {
    this.room.participants.push({
      uid        : this.user.uid,
      displayName: this.user.displayName,
      email      : this.user.email
    });
    this.roomDoc.update(this.room);
  }

  //#endregion

  activeCardEvent(fibonacciModel: FibonacciModel) {

    var oldVote = this.room.votes.find(p => p.uid == this.user.uid);
    if (oldVote)
      this.roomDoc.update({
        votes: firebase.firestore.FieldValue.arrayRemove(oldVote) as unknown as VoteModel[]
      });

    this.roomDoc.update({
      votes: firebase.firestore.FieldValue.arrayUnion({
        uid        : this.user.uid,
        displayName: this.user.displayName,
        value      : fibonacciModel
      }) as unknown as VoteModel[]
    });

  }

  resetVotes() {
    this.room.average = '-';
    this.room.isFlip  = false;
    this.room.votes   = [];
    this.roomDoc.update(this.room);
  }

  flipCard() {
    this.room.isFlip = true;
    this.averageCalc();
  }

  averageCalc() {
    var values            = this.room.votes.filter(v => v.value.value != -1 && v.value.value != 99).map(v => v.value.value);
        this.room.average = (Math.ceil(values.reduce((a, b) => a + b) / values.length)).toString()
    this.roomDoc.update(this.room);
  }

  hasVotes() {
    return (this.room && this.room.votes) ? (this.room.votes.length > 0): false;
  }

}
