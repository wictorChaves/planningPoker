import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector   : 'app-risk-matrix-develop-reproduce',
  templateUrl: './risk-matrix-develop-reproduce.component.html',
  styleUrls  : ['./risk-matrix-develop-reproduce.component.scss']
})
export class RiskMatrixDevelopReproduceComponent implements OnInit {

  @Input () developmentLabel: string       = '';
  @Input () toProduceLabel: string         = '';
  @Input () matrixLabel: string            = '';
  @Output() riskEmit: EventEmitter<number> = new EventEmitter<number>();
  public  selectedDevelopment              = 0;
  public  selectedToProduce                = 0;
  public  risk                             = 0;

  constructor() { }

  ngOnInit() {
  }

  setImpact(value: number) {
    this.selectedDevelopment = (this.selectedDevelopment == value) ? 0 : value;
  }

  setProbability(value: number) {
    this.selectedToProduce = (this.selectedToProduce == value) ? 0 : value;
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
    this.setAndEmitRisk(this.selectedDevelopment * this.selectedToProduce);
  }

  setAndEmitRisk(risk: number) {
    this.setRisk(risk);
    this.riskEmit.emit(risk);
  }

  setRisk(risk: number) {
    this.risk = risk;
  }

}
