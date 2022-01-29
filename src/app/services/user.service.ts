import { Injectable }      from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User }            from 'firebase/app';
import { first }           from 'rxjs/operators';
import { IRoomModel }      from '../interfaces/i-room.model';
import { RoomService }     from './room.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public  fireAuth   : AngularFireAuth,
    private roomService: RoomService,
  ) { }

  getUser() {
    return this.fireAuth.user;
  }

  getUserAndAddUserToRoomIfNotExist(room: IRoomModel) {
    this.getUser().pipe(first()).subscribe(user => {
      this.addUserToRoomIfNotExist(room, user);
    })
  }

  userAlreadyExistInRoom(room: IRoomModel, user: User) {
    return room.participants.find(p => p.uid == user.uid) != undefined;
  }

  addUserToRoomIfNotExist(room: IRoomModel, user: User) {
    if (!this.userAlreadyExistInRoom(room, user)) {
      this.addParticipant(room, user);
    }
  }

  addParticipant(room: IRoomModel, user: User) {
    this.addUserToRoom(room, user);
    this.updateRoom(room);
  }

  addUserToRoom(room: IRoomModel, user: User) {
    room.participants.push({
      uid        : user.uid,
      displayName: user.displayName,
      email      : user.email
    });
  }

  updateRoom(room: IRoomModel) {
    this.roomService.updateRoom(room);
  }

}
