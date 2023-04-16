import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first, map, tap } from 'rxjs/operators';
import { IRoomModel } from 'src/app/interfaces/i-room.model';
import { UserService } from 'src/app/services/user.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  public loading = 0;
  public rooms?: IRoomModel[];

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
  ) {
    this.loadUser();
  }

  ngOnInit() {
  }

  loadUser() {
    this.getUser()
      .pipe(tap(() => { this.startLoading(); }))
      .subscribe(this.loadRooms.bind(this));
  }

  loadRooms(user: firebase.User | null) {
    this.getRooms()
      .subscribe((values: ({ id: any; } & IRoomModel)[]) => {
        var roomsByEmail = this.getRoomsByEmail(values, user?.email ?? '');
        this.setRooms(roomsByEmail);
        this.stopLoading();
      });
  }

  getRoomsByEmail(values: ({ id: any; } & IRoomModel)[], email: string) {
    return values.filter(v => v.participants?.map(p => p.email).includes(email));
  }

  getUser() {
    return this.userService.getUser().pipe(first());
  }

  getRooms() {
    var itemsCollection = this.firestore.collection<IRoomModel[]>('rooms');
    return itemsCollection.snapshotChanges()
      .pipe(map(actions => actions.map(this.actionToRoomModel)));
  }

  //#region  loadRooms

  actionToRoomModel(action: any) {
    const data = action.payload.doc.data() as IRoomModel;
    const id = action.payload.doc.id;
    return Object.assign({ id: id }, data);
  }

  setRooms(rooms: IRoomModel[]) {
    this.rooms = rooms.length <= 0 ? [] : rooms.sort(this.sort);
  }

  sort(a: IRoomModel, b: IRoomModel) {
    return a?.name?.localeCompare(b?.name ?? '') ?? 0;
  }

  //#endregion

  startLoading() {
    this.loading++;
  }

  stopLoading() {
    this.loading--;
  }

}
