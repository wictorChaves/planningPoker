import * as firebase                                  from 'firebase/app';
import { Component, OnInit }                          from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router }                     from '@angular/router';
import { AngularFireAuth }                            from '@angular/fire/auth';
import { FibonacciModel }                             from 'src/app/classes/fibonacci.model';
import { Subject }                                    from 'rxjs';
import { debounceTime }                               from 'rxjs/operators';
import { IRoomModel }                                 from 'src/app/interfaces/i-room.model';
import { IVoteModel }                                 from 'src/app/interfaces/i-vote.model';

@Component({
  selector   : 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls  : ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  public room  : IRoomModel;
  public isFlip: boolean = false;

  private roomId = '';
  private roomDoc: AngularFirestoreDocument<IRoomModel>;
  private user   : any;
  private flipEvent = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore     : AngularFirestore,
    public  fireAuth      : AngularFireAuth,
    private router        : Router
  ) {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadRoom();
    this.flipEvent.pipe(debounceTime(50)).subscribe(isFlip => this.isFlip = isFlip);
  }

  loadRoom() {
    this.roomDoc = this.firestore.doc<IRoomModel>('rooms/' + this.roomId);
    this.roomDoc.valueChanges().subscribe(room => {
      this.room             = room;
      this.room.currentTask = this.room.currentTask ? this.room.currentTask : 0;
      this.flipEvent.next(this.room.isFlip);
      this.includeUserRoom();
    })
  }

  //#region Include Room

  async includeUserRoom() {
    var userSubscription = this.fireAuth.user.subscribe(user => {
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
        votes: firebase.firestore.FieldValue.arrayRemove(oldVote) as unknown as IVoteModel[]
      });

    this.roomDoc.update({
      votes: firebase.firestore.FieldValue.arrayUnion({
        uid        : this.user.uid,
        displayName: this.user.displayName,
        value      : fibonacciModel
      }) as unknown as IVoteModel[]
    });

  }

  resetVotes() {
    this.room.average = '-';
    this.room.isFlip  = false;
    this.room.votes   = [];
    this.roomDoc.update(this.room);
  }

  resetVotesAndGoBack() {
    this.resetVotes();
    this.prevTask();
  }

  resetVotesAndNext() {
    this.resetVotes();
    this.nextTask();
  }

  flipCard() {
    this.room.isFlip = true;
    this.averageCalc();
  }

  averageCalc() {
    var values            = this.room.votes.filter(v => v.value.value != -1 && v.value.value != 99).map(v => v.value.value);
        this.room.average = (Math.ceil(values.length == 0 ? 0 : values.reduce((a, b) => a + b) / values.length)).toString()
    this.roomDoc.update(this.room);
  }

  hasVotes() {
    return (this.room && this.room.votes) ? (this.room.votes.length > 0): false;
  }

  firstTask() {
    this.setCurrentTask(0);
  }

  prevTask() {
    var currentTask = this.room.currentTask - 1;
    if (currentTask <= -1) this.setCurrentTask(this.room.tasks.length - 1);
    else this.setCurrentTask(currentTask);
  }

  nextTask() {
    var currentTask = this.room.currentTask + 1;
    if (currentTask > this.room.tasks.length - 1) this.setCurrentTask(0);
    else this.setCurrentTask(currentTask);
  }

  lastTask() {
    this.setCurrentTask(this.room.tasks.length - 1);
  }

  setCurrentTask(currentTask: number) {
    this.room.currentTask = currentTask;
    this.roomDoc.update(this.room);
  }

  getCurrentTask(currentTask: any) {
    var currentTask = (currentTask) ? currentTask : 0;
    if (this.room)
      if (this.room.tasks)
        if (this.room.tasks.length > 0)
          return this.room.tasks[currentTask];
  }

  goTask() {
    this.router.navigateByUrl(`/tasks/${this.roomId}`);
  }

}
