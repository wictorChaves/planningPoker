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

  setImpact(value: number) {
    this.selectedImpact = (this.selectedImpact == value) ? 0 : value;
  }

  setProbability(value: number) {
    this.selectedProbability = (this.selectedProbability == value) ? 0 : value;
  }

  setImpactAndCalcRisk(value: number) {
    this.setImpact(value);
    this.calcRisk();
  }

  setProbabilityAndCalcRisk(value: number) {
    this.setProbability(value);
    this.calcRisk();
  }

  calcRisk() {
    this.risk = this.selectedImpact * this.selectedProbability;
  }

}
