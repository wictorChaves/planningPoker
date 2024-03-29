import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IRoomModel } from '../interfaces/i-room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private firestore: AngularFirestore) {
  }

  updateRoom(room: IRoomModel) {
    this.firestore.doc<IRoomModel>('rooms/' + room.id).update(room);
  }

  updatePartialRoom(partialRoom: any, roomId: string) {
    this.firestore.doc<IRoomModel>('rooms/' + roomId).update(partialRoom);
  }

  listenerRoom(roomId: string) {
    return this.firestore.doc<IRoomModel>('rooms/' + roomId).valueChanges();
  }


}
