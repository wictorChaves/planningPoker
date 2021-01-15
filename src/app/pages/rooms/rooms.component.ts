import { Component, OnInit }                            from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators }           from '@angular/forms';
import { Router }                                       from '@angular/router';
import { Observable }                                   from 'rxjs';
import { map }                                          from 'rxjs/operators';
import { FormHelper }                                   from 'src/app/helper/form.helper';
import { RoomModel }                                    from './model/room.model';

@Component({
  selector   : 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls  : ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  public items: Observable<RoomModel[]>;
  public form = new FormGroup({
    roomName: new FormControl('', Validators.required)
  });

  private itemsCollection: AngularFirestoreCollection<RoomModel>;

  constructor(
    private afs   : AngularFirestore,
    private router: Router
  ) {
    this.itemsCollection = afs.collection<RoomModel>('rooms');
    this.items           = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as RoomModel;
        const id   = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  ngOnInit() {
  }

  //#region Form

  onSubmit() {
    FormHelper.MarkFormGroupTouched(this.form);
    if (this.form.valid) {
      this.itemsCollection.add(Object.assign({
        name        : this.form.get('roomName').value,
        participants: [],
        votes       : []
      }));
    }
  }

  fieldValid(formControlName: string) {
    return FormHelper.FieldValid(this.form.get(formControlName));
  }

  //#endregion

  goToRoom(id: string) {
    this.router.navigate(['votes', id]);
  }

}
