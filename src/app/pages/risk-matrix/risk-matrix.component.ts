import { Component, Input, OnInit } from '@angular/core';
import { IRoomModel }               from 'src/app/interfaces/i-room.model';
import { Measures }                 from './measures';
import { InfoItemModel }            from './model/info.model';
import { RiskInfosModel }           from './model/rick-infos.model';
import { RiskModel }                from './model/risk.model';

@Component({
  selector   : 'app-risk-matrix',
  templateUrl: './risk-matrix.component.html',
  styleUrls  : ['./risk-matrix.component.scss']
})
export class RiskMatrixComponent implements OnInit {

  @Input() room       : IRoomModel;
  public uncertainty  : RiskModel = { value: 0, emojis: [] };
  public complexity   : RiskModel = { value: 0, emojis: [] };
  public infoItemModel: InfoItemModel;
  public currentSm    : string = 'carol';
  public info         : RiskInfosModel = RiskInfosModel.createRiskInfosModelDefault();

  constructor() { }

  ngOnInit() {
  }

  listenerUncertaintyRisk(risk: RiskModel) {
    var riskModel        = new RiskModel();
        riskModel.value  = Measures.getUncertaintyRiskNumber(risk.value);
        riskModel.emojis = risk.emojis;
        this.uncertainty = riskModel;
  }

  listenerComplexityRisk(risk: RiskModel) {
    var riskModel        = new RiskModel();
        riskModel.value  = Measures.getComplexityRiskNumber(risk.value);
        riskModel.emojis = risk.emojis;
        this.complexity  = riskModel;
  }

  openDescription(infoItemModel: InfoItemModel) {
    this.infoItemModel = infoItemModel;
  }

  closeDescription() {
    this.infoItemModel = undefined;
  }

  changeSM() {
    if (Measures.sm == 'carol') {
      Measures.sm = 'bruno';
    } else {
      Measures.sm = 'carol';
    }
    this.currentSm = Measures.sm;
  }

}
