import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FibonacciModel }                                 from 'src/app/classes/fibonacci.model';
import { FibonacciSequenci }                              from './constants/fibonacci.model.const';

@Component({
  selector   : 'app-fibonacci-deck',
  templateUrl: './fibonacci-deck.component.html',
  styleUrls  : ['./fibonacci-deck.component.scss']
})
export class FibonacciDeckComponent implements OnInit {

  @Input () activeCard?: FibonacciModel = FibonacciSequenci.find(x => x.value == 1);
  @Output() activeCardEvent            = new EventEmitter<FibonacciModel>();

  constructor() { }

  ngOnInit() { }

  setActive(fibonacci: FibonacciModel) {
    this.activeCard = fibonacci;
    this.activeCardEvent.emit(this.activeCard);
  }

  getFibonacciSequenci() {
    return FibonacciSequenci;
  }

}
