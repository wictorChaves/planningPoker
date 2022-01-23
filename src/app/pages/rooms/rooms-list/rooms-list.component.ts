import { Component, Input, OnInit } from '@angular/core';
import { Router }                   from '@angular/router';
import { IRoomModel }               from 'src/app/interfaces/i-room.model';

@Component({
  selector   : 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls  : ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {

  @Input() rooms: IRoomModel[];

  constructor(private router: Router) { }

  ngOnInit() { }

  goToRoom(id: string) {
    this.router.navigate(['tasks', id]);
  }

}
