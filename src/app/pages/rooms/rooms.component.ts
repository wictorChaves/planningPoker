import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, forkJoin } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { IRoomModel } from 'src/app/interfaces/i-room.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  public loading = false;
  public rooms?: IRoomModel[];

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
  ) {
    this.loadRooms();
  }

  ngOnInit() {
  }

  //#region  loadRooms

  loadRooms() {
    this.setLoading(true);
    var itemsCollection = this.firestore.collection<IRoomModel>('rooms');
    itemsCollection.snapshotChanges()
      .pipe(map(actions => actions.map(this.actionToRoomModel)))
      .subscribe(items => {
        this.setRooms(items);
        this.setLoading(false);
      });
  }

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

  setLoading(loading: boolean) {
    this.loading = loading;
  }

}
