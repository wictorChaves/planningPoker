import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InfoItemModel, InfoModel }                       from '../model/info.model';
import { RiskModel }                                      from '../model/risk.model';

@Component({
  selector   : 'app-risk-matrix-develop-reproduce',
  templateUrl: './risk-matrix-develop-reproduce.component.html',
  styleUrls  : ['./risk-matrix-develop-reproduce.component.scss']
})
export class RiskMatrixDevelopReproduceComponent implements OnInit {

  @Input () info: InfoModel                          = new InfoModel();
  @Input () sm: string                               = 'carol';
  @Output() listenerRisk: EventEmitter<RiskModel>    = new EventEmitter<RiskModel>();
  @Output() description: EventEmitter<InfoItemModel> = new EventEmitter<InfoItemModel>();
  public  selectedDevelopment                        = 0;
  public  selectedToProduce                          = 0;
  public  risk: RiskModel                            = { value: 0, emojis: [] };

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
    this.setAndSendRisk(this.selectedDevelopment * this.selectedToProduce);
  }

  setAndSendRisk(risk: number) {
    var riskModel = this.buildRiskModel(risk);
    this.setRisk(riskModel);
    this.sendRisk(riskModel);
  }

  buildRiskModel(risk: number) {
    var riskModel        = new RiskModel();
        riskModel.value  = risk;
        riskModel.emojis = this.getEmojis(risk);
    return riskModel;
  }

  sendRisk(risk: RiskModel) {
    this.listenerRisk.emit(risk);
  }

  setRisk(risk: RiskModel) {
    this.risk = risk;
  }

  getEmojis(risk: number): string[] {
    switch (risk) {
      case 5: 
        return this.getEmojisByIndex(0, 0);
      case 10: 
        return this.getEmojisByIndex(1, 0);
      case 15: 
        return this.getEmojisByIndex(2, 0);
      case 6: 
        return this.getEmojisByIndex(0, 1);
      case 12: 
        return this.getEmojisByIndex(1, 1);
      case 18: 
        return this.getEmojisByIndex(2, 1);
      case 7: 
        return this.getEmojisByIndex(0, 2);
      case 14: 
        return this.getEmojisByIndex(1, 2);
      case 21: 
        return this.getEmojisByIndex(2, 2);
      default: 
        return [];
    }
  }

  getEmojisByIndex(firstIndex: number, secondIndex: number): string[] {
    return [this.info.first.icons[firstIndex], this.info.second.icons[secondIndex]];
  }

}
