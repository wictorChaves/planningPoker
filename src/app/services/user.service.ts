import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs/operators';
import { IRoomModel } from '../interfaces/i-room.model';
import { RoomService } from './room.service';
import firebase from 'firebase/compat/app';
import { IUserModel } from '../interfaces/i-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public fireAuth: AngularFireAuth,
    private roomService: RoomService,
  ) { }

  getUser() {
    return this.fireAuth.user;
  }

  getUserAndAddUserToRoomIfNotExist(room: IRoomModel) {
    this.getUser().pipe(first()).subscribe((user: firebase.User | null) => {
      this.addUserToRoomIfNotExist(room, user);
    });
  }

  userAlreadyExistInRoom(room: IRoomModel, user: firebase.User | null) {
    return room?.participants?.find(p => p.uid == user?.uid) != undefined;
  }

  addUserToRoomIfNotExist(room: IRoomModel, user: firebase.User | null) {
    if (!this.userAlreadyExistInRoom(room, user)) {
      this.addParticipant(room, user);
    }
  }

  addParticipant(room: IRoomModel, user: firebase.User | null) {
    this.addUserToRoom(room, user);
    this.updateRoom(room);
  }

  addUserToRoom(room: IRoomModel, user: firebase.User | null) {
    room?.participants?.push({
      uid: user?.uid,
      displayName: user?.displayName,
      email: user?.email
    } as IUserModel);
  }

  updateRoom(room: IRoomModel) {
    this.roomService.updateRoom(room);
  }

}
