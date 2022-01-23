import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IRoomModel } from 'src/app/interfaces/i-room.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  public loading = false;
  public rooms: IRoomModel[];

  constructor(private firestore: AngularFirestore) {
    this.loadRooms();
  }

  ngOnInit() { }

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
    return { id, ...data };
  }

  setRooms(rooms: IRoomModel[]) {
    this.rooms = rooms;
  }

  //#endregion

  setLoading(loading: boolean) {
    this.loading = loading;
  }

}
