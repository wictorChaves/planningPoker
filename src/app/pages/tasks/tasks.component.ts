import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { IRoomModel } from 'src/app/interfaces/i-room.model';
import { RoomModel } from 'src/app/classes/room.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  public roomId: string | null;
  public room: IRoomModel = new RoomModel();
  private roomDoc?: AngularFirestoreDocument<IRoomModel>;
  public form: FormGroup = new FormGroup({
    taskList: new FormControl('', [])
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadRoom();
  }

  loadRoom() {
    this.roomDoc = this.firestore.doc<IRoomModel>('rooms/' + this.roomId);
    this.roomDoc.valueChanges().subscribe(this.loadTaskAndSetRoom.bind(this));
  }

  loadTaskAndSetRoom(room: IRoomModel | undefined) {
    this.setRoom(room);
    this.loadTasks(room);
  }

  loadTasks(room?: IRoomModel) {
    if (room)
      if (room.tasks)
        this.form.patchValue({ taskList: room.tasks.join('\n') })
  }

  setRoom(room: any) {
    this.room = room;
  }

  saveAndGoVote() {
    var list = this.getList();
    this.addTasks(list);
    this.goVote();
  }

  addTasks(tasks: string[]) {
    this.room.currentTask = 0;
    this.room.tasks = tasks;
    this.roomDocUpdate(this.room);
  }

  roomDocUpdate(room?: IRoomModel) {
    if (this.roomDoc && room) this.roomDoc.update(room);
  }

  goVote() {
    this.router.navigateByUrl(`/votes/${this.roomId}`);
  }

  getList(): string[] {
    var taskList = this.form.get('taskList');
    return (taskList?.value ?? "")
      .split('\n')
      .map((i: string) => i.trim())
      .filter((i: string) => i.length > 0);
  }

}
