import { Subject }           from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector   : 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls  : ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public  isOpen: boolean         = false;
  private answer: Subject<number> = new Subject<number>();

  constructor() { }

  ngOnInit() {
  }

  getAnswer(){
    return this.answer;
  }

  setValue(value: number) {
    this.answer.next(value);
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

}
