import { Component, Input, OnInit }           from '@angular/core';
import { AngularFirestore }                   from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { FormHelper }                         from 'src/app/helper/form.helper';
import { IRoomModel }                         from 'src/app/interfaces/i-room.model';

@Component({
  selector   : 'app-rooms-form',
  templateUrl: './rooms-form.component.html',
  styleUrls  : ['./rooms-form.component.scss']
})
export class RoomsFormComponent implements OnInit {

  @Input() rooms: IRoomModel[];
  public loading      = false;
  public messageError = '';
  public form         = new FormGroup({ roomName: new FormControl('', Validators.required) });

  constructor(private firestore: AngularFirestore, private router: Router) {
  }

  ngOnInit() { }

  //#region Form

  onSubmit() {
    if (this.validateForm()) {
      this.loading = true;
      this.firestore.collection<IRoomModel>('rooms').add(Object.assign({
        name        : this.form.get('roomName').value,
        average     : '-',
        isFlip      : false,
        currentTask : 0,
        tasks       : [],
        participants: [],
        votes       : []
      })).then(result => {
        this.loading = false;
        this.goToTaskPage(result);
      });
    }
  }

  goToTaskPage(result: any) {
    this.router.navigateByUrl(`/tasks/${result.id}`);
  }

  validateForm() {
    this.messageError = '';
    FormHelper.MarkFormGroupTouched(this.form);
    if (!this.form.valid) {
      this.messageError = 'Você se esqueceu de preencher o nome da sala 😜';
      return false;
    }
    if (this.roomAlreadyExist()) {
      this.messageError = 'Esta sala já existe 🤔';
      return false;
    }
    return true;
  }

  roomAlreadyExist(): boolean {
    return this.rooms.find(r => r.name.toLowerCase().trim() == this.form.get('roomName').value.toLowerCase().trim()) !== undefined;
  }

  FieldInvalid(formControlName: string) {
    return FormHelper.FieldInvalid(this.form.get(formControlName));
  }

  //#endregion

}
