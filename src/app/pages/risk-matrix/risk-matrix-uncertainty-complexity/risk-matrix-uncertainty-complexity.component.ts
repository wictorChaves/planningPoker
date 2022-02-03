import { Component, Input, OnInit } from '@angular/core';
import { FibonacciModel }           from 'src/app/classes/fibonacci.model';
import { IRoomModel }               from 'src/app/interfaces/i-room.model';
import { VoteService }              from 'src/app/services/vote.service';

@Component({
  selector   : 'app-risk-matrix-uncertainty-complexity',
  templateUrl: './risk-matrix-uncertainty-complexity.component.html',
  styleUrls  : ['./risk-matrix-uncertainty-complexity.component.scss']
})
export class RiskMatrixUncertaintyComplexityComponent implements OnInit {

  @Input() room             : IRoomModel;
  public selectedUncertainty: number;
  public selectedComplexity : number;
  public risk               : number = 0;
  public fibonacciSequenci  : FibonacciModel[] = [
    {
      value      : 0,
      description: '0',
      class      : 'primary'
    },
    {
      value      : 1,
      description: 'A',
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
      description: 'K',
      class      : 'success'
    }
  ];

  constructor(private userService: VoteService) { }

  ngOnInit() {
  }

  setUncertainty(value: number) {
    this.selectedUncertainty = (this.selectedUncertainty == value) ? 0 : value;
  }

  setComplexity(value: number) {
    this.selectedComplexity = (this.selectedComplexity == value) ? 0 : value;
  }

  @Input() set setUncertaintyAndCalcRisk(value: number) {
    this.setUncertainty(value);
    this.calcRisk();
  }

  @Input() set setComplexityAndCalcRisk(value: number) {
    this.setComplexity(value);
    this.calcRisk();
  }

  calcRisk() {
    if (!this.isValidSelectedValues()) return;
    this.risk = this.selectedUncertainty * this.selectedComplexity;
    this.getRickAndSelectCard(this.risk);
  }

  isValidSelectedValues() {
    return this.selectedUncertainty && this.selectedComplexity;
  }

  getRickAndSelectCard(risk: number) {
    if ([5].includes(risk))
      this.getFibonacciSequenciAndSelectCard(1);
    if ([10, 6].includes(risk))
      this.getFibonacciSequenciAndSelectCard(2);
    if ([15, 12, 7].includes(risk))
      this.getFibonacciSequenciAndSelectCard(5);
    if ([18, 14].includes(risk))
      this.getFibonacciSequenciAndSelectCard(8);
    if ([21].includes(risk))
      this.getFibonacciSequenciAndSelectCard(13);
    if ([0].includes(risk))
      this.getFibonacciSequenciAndSelectCard(0);
  }

  getFibonacciSequenciAndSelectCard(risk: number) {
    var fibonacciSequenci = this.fibonacciSequenci.find(x => x.value == risk);
    if (fibonacciSequenci)
      this.selectCard(fibonacciSequenci);
  }

  selectCard(fibonacciModel: FibonacciModel) {
    this.userService.activeCardEvent(this.room, fibonacciModel);
  }

}
