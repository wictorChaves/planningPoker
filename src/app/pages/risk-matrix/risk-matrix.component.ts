import { Component, Input, OnInit } from '@angular/core';
import { IRoomModel }               from 'src/app/interfaces/i-room.model';
import { RickModel }                from './model/risk.model';

@Component({
  selector   : 'app-risk-matrix',
  templateUrl: './risk-matrix.component.html',
  styleUrls  : ['./risk-matrix.component.scss']
})
export class RiskMatrixComponent implements OnInit {

  @Input() room     : IRoomModel;
  public uncertainty: RickModel = { value: 0, emojis: [] };
  public complexity : RickModel = { value: 0, emojis: [] };

  constructor() { }

  ngOnInit() {
  }

  listenerUncertaintyRisk(risk: RickModel) {
    var riskModel        = new RickModel();
        riskModel.value  = this.getUncertaintyRiskNumber(risk.value);
        riskModel.emojis = risk.emojis;
        this.uncertainty = riskModel;
  }

  listenerComplexityRisk(risk: RickModel) {
    var riskModel        = new RickModel();
        riskModel.value  = this.getComplexityRiskNumber(risk.value);
        riskModel.emojis = risk.emojis;
        this.complexity  = riskModel;
  }

  getUncertaintyRiskNumber(risk: number): number {
    if ([5].includes(risk))
      return 1;
    if ([10, 15, 6, 7].includes(risk))
      return 2;
    if ([12, 18, 14, 21].includes(risk))
      return 3;
    if ([0].includes(risk))
      return 0;
  }

  getComplexityRiskNumber(risk: number): number {
    if ([5].includes(risk))
      return 5;
    if ([10, 15, 6, 7].includes(risk))
      return 6;
    if ([12, 18, 14, 21].includes(risk))
      return 7;
    if ([0].includes(risk))
      return 0;
  }

}
