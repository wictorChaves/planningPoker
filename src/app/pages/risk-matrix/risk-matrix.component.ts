import { Component, OnInit } from '@angular/core';

@Component({
  selector   : 'app-risk-matrix',
  templateUrl: './risk-matrix.component.html',
  styleUrls  : ['./risk-matrix.component.scss']
})
export class RiskMatrixComponent implements OnInit {

  public selectedImpact      = 0;
  public selectedProbability = 0;
  public risk                = 0;

  constructor() { }

  ngOnInit() {
  }

  setImpactAndCalcRick(value: number) {
    this.selectedImpact = (this.selectedImpact == value) ? 0 : value;
    this.calcRick();
  }

  setProbabilityAndCalcRick(value: number) {
    this.selectedProbability = (this.selectedProbability == value) ? 0 : value;
    this.calcRick();
  }

  calcRick() {
    this.risk = this.selectedImpact * this.selectedProbability;
  }

}
