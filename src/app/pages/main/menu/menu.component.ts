import { Component, OnInit } from '@angular/core';
import { AngularFireAuth }   from '@angular/fire/auth';

@Component({
  selector   : 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls  : ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public auth: AngularFireAuth) { }

  ngOnInit() {
  }

  logout() {
    this.auth.auth.signOut();
  }

}
