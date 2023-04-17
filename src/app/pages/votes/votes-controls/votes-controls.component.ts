import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { IRoomModel } from 'src/app/interfaces/i-room.model';

@Component({
  selector: 'app-votes-controls',
  templateUrl: './votes-controls.component.html',
  styleUrls: ['./votes-controls.component.scss']
})
export class VotesControlsComponent implements OnInit {

  @Input() room?: IRoomModel;
  @Input() isFlip: boolean = false;
  private roomDoc?: AngularFirestoreDocument<IRoomModel>;

  constructor(
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.roomDoc = this.firestore.doc<IRoomModel>('rooms/' + this.room?.id);
  }

  hasVotes() {
    return (this.room && this.room.votes) ? (this.room.votes.length > 0) : false;
  }

  getCurrentTask(currentTask: any) {
    var currentTask = (currentTask) ? currentTask : 0;
    if (this.room)
      if (this.room.tasks)
        if (this.room.tasks.length > 0)
          return this.room.tasks[currentTask];
    return "";
  }

  resetVotesAndGoBack() {
    this.resetVotes();
    this.prevTask();
  }

  resetVotes() {
    if (this.room) {
      this.room.average = '-';
      this.room.isFlip = false;
      this.room.votes = [];
      if (this.roomDoc) {
        this.roomDoc.update(this.room);
      }
    }
  }

  flipCard() {
    if (this.room)
      this.room.isFlip = true;
    this.averageCalc();
  }

  resetVotesAndNext() {
    this.resetVotes();
    this.nextTask();
  }

  prevTask() {
    if (this.room) {
      var currentTask = (this.room.currentTask ?? 0) - 1;
      if (currentTask <= -1) this.setCurrentTask((this.room?.tasks?.length ?? 0) - 1);
      else this.setCurrentTask(currentTask);
    }
  }

  averageCalc() {
    if (this.room) {
      var values = this.room?.votes?.filter(v => v?.value?.value != -1 && v?.value?.value != 99).map(v => v?.value?.value);
      var sum = (values ?? []).reduce((a?: number, b?: number) => (a ?? 0) + (b ?? 0)) ?? 0;
      var average = values?.length ? sum / values?.length : 0;
      var ceilAverage = Math.ceil(average);
      this.room.average = ceilAverage.toString();
      this.roomDocUpdate(this.room);
    }
  }

  roomDocUpdate(room?: IRoomModel) {
    if (this.roomDoc && room) this.roomDoc.update(room);
  }

  nextTask() {
    var currentTask = (this.room?.currentTask ?? 0) + 1;
    if (currentTask > (this.room?.tasks?.length ?? 0) - 1) this.setCurrentTask(0);
    else this.setCurrentTask(currentTask);
  }

  setCurrentTask(currentTask: number) {
    if (this.room) this.room.currentTask = currentTask;
    this.roomDocUpdate(this.room);
  }

  firstTask() {
    this.setCurrentTask(0);
  }

  goTask() {
    this.router.navigateByUrl(`/tasks/${this.room?.id}`);
  }

  lastTask() {
    this.setCurrentTask((this.room?.tasks?.length ?? 0) - 1);
  }

}
