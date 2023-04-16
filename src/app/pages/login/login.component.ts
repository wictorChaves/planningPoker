import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.signInWithPopup(this.newGoogleAuthProvider()).then(userCredential => {
      this.router.navigateByUrl('/rooms');
    }, error => { this.logError(error) });
  }

  newGoogleAuthProvider() {
    return new firebase.auth.GoogleAuthProvider();
  }

  logError(error: any) {
    console.error(error);
  }

}
