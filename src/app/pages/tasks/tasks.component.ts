import { Component, OnInit }                          from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router }                     from '@angular/router';
import { AngularFireAuth }                            from '@angular/fire/auth';
import { FormControl, FormGroup }                     from '@angular/forms';
import { IRoomModel }                                 from 'src/app/interfaces/i-room.model';
import { RoomModel }                                  from 'src/app/classes/room.model';

@Component({
  selector   : 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls  : ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  public  roomId : string;
  public  room   : IRoomModel = new RoomModel();
  private roomDoc: AngularFirestoreDocument<IRoomModel>;
  public  form   : FormGroup = new FormGroup({
    taskList: new FormControl('', [])
  });

  constructor(
    private route           : ActivatedRoute,
    private angularFirestore: AngularFirestore,
    public  auth            : AngularFireAuth,
    private router          : Router
  ) {
    this.roomId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadRoom();
  }

  loadRoom() {
    this.roomDoc = this.angularFirestore.doc<IRoomModel>('rooms/' + this.roomId);
    this.roomDoc.valueChanges().subscribe(this.loadTaskAndSetRoom.bind(this));
  }

  loadTaskAndSetRoom(room: IRoomModel) {
    this.setRoom(room);
    this.loadTasks(room);
  }

  loadTasks(room: IRoomModel) {
    this.form.patchValue({ taskList: room.tasks.join('\n') })
  }

  setRoom(room: any) {
    this.room = room;
  }

  saveAndGoVote() {
    var list = this.getList();
    this.addTasks(list);
  }

  addTasks(tasks: string[]) {
    this.room.tasks = tasks;
    this.roomDoc.update(this.room);
    this.router.navigateByUrl(`/votes/${this.roomId}`);
  }

  getList(): string[] {
    return this.form.get('taskList').value.split('\n').map(i => i.trim()).filter(i => i.length > 0);
  }

}
