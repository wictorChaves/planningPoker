import { Component, OnInit }                            from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators }           from '@angular/forms';
import { Router }                                       from '@angular/router';
import { finalize, map }                                from 'rxjs/operators';
import { FormHelper }                                   from 'src/app/helper/form.helper';
import { IRoomModel }                                   from 'src/app/interfaces/i-room.model';

@Component({
  selector   : 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls  : ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  public messageError    = '';
  public loading         = false;
  public loadingRedirect = false;
  public rooms: IRoomModel[];
  public form = new FormGroup({ roomName: new FormControl('', Validators.required) });

  private itemsCollection: AngularFirestoreCollection<IRoomModel>;

  constructor(afs: AngularFirestore, private router: Router) {
    this.loading         = true;
    this.itemsCollection = afs.collection<IRoomModel>('rooms');
    this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as IRoomModel;
        const id   = a.payload.doc.id;
        return { id, ...data };
      });
    })).subscribe(items => {
      this.rooms   = items;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  ngOnInit() {
  }

  //#region Form

  onSubmit() {
    if (this.validateForm()) {
      this.loadingRedirect = true;
      this.itemsCollection.add(Object.assign({
        name        : this.form.get('roomName').value,
        average     : '-',
        isFlip      : false,
        currentTask : 0,
        tasks       : [],
        participants: [],
        votes       : []
      })).then(result => {
        this.loadingRedirect = false;
        this.router.navigateByUrl(`/tasks/${result.id}`);
      });
    }
  }

  validateForm() {
    this.messageError = '';
    FormHelper.MarkFormGroupTouched(this.form);
    if (!this.form.valid) {
      this.messageError = 'Você se esqueceu de preencher o nome da sala 😜';
      return false;
    }
    if (this.hasItem()) {
      this.messageError = 'Esta sala já existe 🤔';
      return false;
    }
    return true;
  }

  hasItem(): boolean {
    return this.rooms.find(r => r.name.toLowerCase().trim() == this.form.get('roomName').value.toLowerCase().trim()) !== undefined;
  }

  fieldValid(formControlName: string) {
    return FormHelper.FieldValid(this.form.get(formControlName));
  }

  //#endregion

  goToRoom(id: string) {
    this.router.navigate(['tasks', id]);
  }

}
