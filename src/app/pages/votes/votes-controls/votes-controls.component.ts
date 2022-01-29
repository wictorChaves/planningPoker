import { Component, Input, OnInit }                   from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router }                                     from '@angular/router';
import { IRoomModel }                                 from 'src/app/interfaces/i-room.model';

@Component({
  selector   : 'app-votes-controls',
  templateUrl: './votes-controls.component.html',
  styleUrls  : ['./votes-controls.component.scss']
})
export class VotesControlsComponent implements OnInit {

  @Input () room  : IRoomModel;
  @Input () isFlip: boolean = false;
  private roomDoc : AngularFirestoreDocument<IRoomModel>;

  constructor(
    private firestore: AngularFirestore,
    private router   : Router
  ) { }

  ngOnInit() {
    this.roomDoc = this.firestore.doc<IRoomModel>('rooms/' + this.room.id);
  }

  hasVotes() {
    return (this.room && this.room.votes) ? (this.room.votes.length > 0): false;
  }

  getCurrentTask(currentTask: any) {
    var currentTask = (currentTask) ? currentTask : 0;
    if (this.room)
      if (this.room.tasks)
        if (this.room.tasks.length > 0)
          return this.room.tasks[currentTask];
  }

  resetVotesAndGoBack() {
    this.resetVotes();
    this.prevTask();
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

  resetVotesAndNext() {
    this.resetVotes();
    this.nextTask();
  }

  prevTask() {
    var currentTask = this.room.currentTask - 1;
    if (currentTask <= -1) this.setCurrentTask(this.room.tasks.length - 1);
    else this.setCurrentTask(currentTask);
  }

  averageCalc() {
    var values            = this.room.votes.filter(v => v.value.value != -1 && v.value.value != 99).map(v => v.value.value);
        this.room.average = (Math.ceil(values.length == 0 ? 0 : values.reduce((a, b) => a + b) / values.length)).toString()
    this.roomDoc.update(this.room);
  }

  nextTask() {
    var currentTask = this.room.currentTask + 1;
    if (currentTask > this.room.tasks.length - 1) this.setCurrentTask(0);
    else this.setCurrentTask(currentTask);
  }

  setCurrentTask(currentTask: number) {
    this.room.currentTask = currentTask;
    this.roomDoc.update(this.room);
  }

  firstTask() {
    this.setCurrentTask(0);
  }

  goTask() {
    this.router.navigateByUrl(`/tasks/${this.room.id}`);
  }

  lastTask() {
    this.setCurrentTask(this.room.tasks.length - 1);
  }

}
