import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-matrix-uncertainty-complexity',
  templateUrl: './risk-matrix-uncertainty-complexity.component.html',
  styleUrls: ['./risk-matrix-uncertainty-complexity.component.scss']
})
export class RiskMatrixUncertaintyComplexityComponent implements OnInit {

  public selectedUncertainty = 0;
  public selectedComplexity = 0;
  public risk = 0;

  constructor() { }

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
    this.risk = this.selectedUncertainty * this.selectedComplexity;
  }

}
