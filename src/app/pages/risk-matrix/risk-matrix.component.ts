import { Component, Input, OnInit } from '@angular/core';
import { IRoomModel }               from 'src/app/interfaces/i-room.model';
import { RiskModel }                from './model/risk.model';

@Component({
  selector   : 'app-risk-matrix',
  templateUrl: './risk-matrix.component.html',
  styleUrls  : ['./risk-matrix.component.scss']
})
export class RiskMatrixComponent implements OnInit {

  @Input() room     : IRoomModel;
  public uncertainty: RiskModel = { value: 0, emojis: [] };
  public complexity : RiskModel = { value: 0, emojis: [] };

  public uncertaintyInfo = {
    label: 'Incerteza',
    first: {
      icons      : ['🛴', '🚲', '🚗'],
      label      : 'O que fazer',
      description: 'Estória tá clara?'
    },
    second: {
      icons      : ['✨', '🦺', '🧨'],
      label      : 'Como fazer',
      description: 'Como seria se o projeto não fosse legado?'
    }
  };

  public reproduceInfo = {
    label: 'Complexidade',
    first: {
      icons      : ['🐱‍💻','👩‍💻','🔨'],
      label      : 'Desenvolver',
      description: 'E agora com o projeto que temos, como vai ser?'
    },
    second: {
      icons      : ['😄','🤔','🤡'],
      label      : 'Reproduzir',
      description: 'E para testar, tá legal?'
    }
  };

  constructor() { }

  ngOnInit() {
  }

  listenerUncertaintyRisk(risk: RiskModel) {
    var riskModel        = new RiskModel();
        riskModel.value  = this.getUncertaintyRiskNumber(risk.value);
        riskModel.emojis = risk.emojis;
        this.uncertainty = riskModel;
  }

  listenerComplexityRisk(risk: RiskModel) {
    var riskModel        = new RiskModel();
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
