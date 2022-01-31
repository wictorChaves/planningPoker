import { Component, OnInit } from '@angular/core';

@Component({
  selector   : 'app-risk-matrix',
  templateUrl: './risk-matrix.component.html',
  styleUrls  : ['./risk-matrix.component.scss']
})
export class RiskMatrixComponent implements OnInit {

  public uncertainty = 0;
  public complexity  = 0;

  constructor() { }

  ngOnInit() {
  }

  uncertaintyEvent(risk: number) {
    if ([5].includes(risk))
      this.uncertainty = 1;
    if ([10, 15, 6, 7].includes(risk))
      this.uncertainty = 2;
    if ([12, 18, 14, 21].includes(risk))
      this.uncertainty = 3;
    if ([0].includes(risk))
      this.uncertainty = 0;
  }

  complexityEvent(risk: number) {
    if ([5].includes(risk))
      this.complexity = 5;
    if ([10, 15, 6, 7].includes(risk))
      this.complexity = 6;
    if ([12, 18, 14, 21].includes(risk))
      this.complexity = 7;
    if ([0].includes(risk))
      this.complexity = 0;
  }

}
