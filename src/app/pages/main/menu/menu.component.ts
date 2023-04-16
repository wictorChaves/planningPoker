import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public angularFireAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.angularFireAuth.user.subscribe((user: any) => {
      console.log(user.photoURL)
    })
  }

  logout() {
    this.angularFireAuth.signOut();
    this.router.navigateByUrl('/login');
  }

}
