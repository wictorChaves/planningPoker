import { Component, OnInit } from '@angular/core';
import { AngularFireAuth }   from '@angular/fire/auth';
import { Router }            from '@angular/router';

@Component({
  selector   : 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls  : ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public  angularFireAuth: AngularFireAuth,
    private router         : Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }

}
