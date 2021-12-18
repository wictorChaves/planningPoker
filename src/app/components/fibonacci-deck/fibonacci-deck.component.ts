import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FibonacciModel }                                 from 'src/app/classes/fibonacci.model';

@Component({
  selector   : 'app-fibonacci-deck',
  templateUrl: './fibonacci-deck.component.html',
  styleUrls  : ['./fibonacci-deck.component.scss']
})
export class FibonacciDeckComponent implements OnInit {

  @Output() activeCardEvent      = new EventEmitter<FibonacciModel>();

  @Input() activeCard: FibonacciModel = {
    value      : 1,
    description: '1',
    class      : 'primary'
  };

  public fibonacciSequenci: FibonacciModel[] = [
    {
      value      : 0,
      description: '0',
      class      : 'primary'
    },
    {
      value      : 1,
      description: '1',
      class      : 'primary'
    },
    {
      value      : 2,
      description: '2',
      class      : 'primary'
    },
    {
      value      : 3,
      description: '3',
      class      : 'primary'
    },
    {
      value      : 5,
      description: '5',
      class      : 'primary'
    },
    {
      value      : 8,
      description: '8',
      class      : 'primary'
    },
    {
      value      : 13,
      description: '13',
      class      : 'success'
    },
    {
      value      : 21,
      description: '21',
      class      : 'success'
    },
    {
      value      : 34,
      description: '34',
      class      : 'success'
    },
    {
      value      : 55,
      description: '55',
      class      : 'success'
    },
    {
      value      : 89,
      description: '89',
      class      : 'success'
    },
    {
      value      : 99,
      description: '?',
      class      : 'warning'
    },
    {
      value      : -1,
      description: 'Pass',
      class      : 'secondary'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  setActive(fibonacci: FibonacciModel) {
    this.activeCard = fibonacci;
    this.activeCardEvent.emit(this.activeCard);
  }

}
