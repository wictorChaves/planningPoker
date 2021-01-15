import { Observable }                                 from 'rxjs';
import { RoomModel }                                  from './../rooms/model/room.model';
import { Component, OnInit }                          from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute }                             from '@angular/router';
import { AngularFireAuth }                            from '@angular/fire/auth';
import { FibonacciModel }                             from 'src/app/models/fibonacci.model';

@Component({
  selector   : 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls  : ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  public  hideCard = true;
  public  average  = '-';
  private roomId   = '';
  private roomDoc: AngularFirestoreDocument<RoomModel>;
  private room   : RoomModel;
  private user   : any;

  constructor(
    private route: ActivatedRoute,
    private afs  : AngularFirestore,
    public  auth : AngularFireAuth
  ) {
    this.roomId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadRoom();
  }

  loadRoom() {
    this.roomDoc = this.afs.doc<RoomModel>('rooms/' + this.roomId);
    this.roomDoc.valueChanges().subscribe(room => {
      this.room = room;
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
    var votes = this.room.votes.filter(p => p.uid != this.user.uid);
    votes.push({
      uid        : this.user.uid,
      displayName: this.user.displayName,
      value      : fibonacciModel
    });
    this.room.votes = votes;
    this.roomDoc.update(this.room);
  }

  resetVotes() {
    this.average    = '-';
    this.hideCard   = true;
    this.room.votes = [];
    this.roomDoc.update(this.room);
  }

  flipCard() {
    this.hideCard = false;
    this.averageCalc();
  }

  averageCalc() {
    var values       = this.room.votes.filter(v => v.value.value != -1 && v.value.value != 99).map(v => v.value.value);
        this.average = (Math.ceil(values.reduce((a, b) => a + b) / values.length)).toString()
  }

}
