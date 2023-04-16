import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IRoomModel } from 'src/app/interfaces/i-room.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  public room?: IRoomModel;
  public isFlip: boolean = false;
  public flipEvent = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.loadRoom();
    this.waitAndFlip();
  }

  waitAndFlip() {
    this.flipEvent.pipe(debounceTime(50)).subscribe(isFlip => this.isFlip = isFlip);
  }

  getRoomId() {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  loadRoom() {
    var roomId = this.getRoomId();
    this.firestore.doc<IRoomModel>('rooms/' + roomId)
      .valueChanges().subscribe((room?: IRoomModel) => {
        if (room) {
          this.room = room;
          this.room.id = roomId ?? "";
          this.room.currentTask = this.room.currentTask ? this.room.currentTask : 0;
          this.flipEvent.next(this.room?.isFlip ?? false);
          this.getUserAndAddUserToRoomIfNotExist(room);
        }
      })
  }

  getUserAndAddUserToRoomIfNotExist(room: IRoomModel) {
    this.userService.getUserAndAddUserToRoomIfNotExist(room);
  }

}
