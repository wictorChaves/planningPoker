import { Component, OnInit } from '@angular/core';
import { AngularFireAuth }   from '@angular/fire/auth';
import { Router }            from '@angular/router';
import * as firebase         from 'firebase';

@Component({
  selector   : 'app-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public  auth  : AngularFireAuth,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(userCredential => {
      this.router.navigateByUrl('/rooms');
    }, error => { console.log(error) });
  }

}
