import { Component, Input, OnInit } from '@angular/core';
import { FibonacciModel }           from 'src/app/classes/fibonacci.model';
import { FibonacciSequenci }        from 'src/app/components/fibonacci-deck/constants/fibonacci.model.const';
import { IRoomModel }               from 'src/app/interfaces/i-room.model';
import { VoteService }              from 'src/app/services/vote.service';
import { RiskModel }                from '../model/risk.model';

@Component({
  selector   : 'app-risk-matrix-uncertainty-complexity',
  templateUrl: './risk-matrix-uncertainty-complexity.component.html',
  styleUrls  : ['./risk-matrix-uncertainty-complexity.component.scss']
})
export class RiskMatrixUncertaintyComplexityComponent implements OnInit {

  @Input() set setUncertaintyAndCalcRisk(value: RiskModel) {
    this.setUncertainty(value);
    this.calcRisk();
  }

  @Input() set setComplexityAndCalcRisk(value: RiskModel) {
    this.setComplexity(value);
    this.calcRisk();
  }

  @Input() room             : IRoomModel;
  public selectedUncertainty: RiskModel = { value: 0, emojis: [] };
  public selectedComplexity : RiskModel = { value: 0, emojis: [] };
  public risk               : RiskModel = { value: 0, emojis: [] };

  constructor(private userService: VoteService) { }

  ngOnInit() {
  }

  getEmojis(selectedUncertainty: RiskModel, selectedComplexity: RiskModel) {
    return [...selectedUncertainty.emojis, ...selectedComplexity.emojis].join('');
  }

  setUncertainty(risk: RiskModel) {
    this.selectedUncertainty = risk;
  }

  setComplexity(risk: RiskModel) {
    this.selectedComplexity = risk;
  }

  buildRisk() {
    var riskModel        = new RiskModel();
        riskModel.value  = this.selectedUncertainty.value * this.selectedComplexity.value;
        riskModel.emojis = [...this.selectedUncertainty.emojis, ... this.selectedComplexity.emojis];
    return riskModel;
  }

  calcRisk() {
        this.risk = this.buildRisk();
    var risk      = this.getMatrixRisk(this.risk.value);
    this.getFibonacciSequenciAndSelectCard(risk);
  }

  getMatrixRisk(risk: number): number {
    if ([5].includes(risk))
      return 1;
    if ([10, 6].includes(risk))
      return 2;
    if ([15, 12, 7].includes(risk))
      return 5;
    if ([18, 14].includes(risk))
      return 8;
    if ([21].includes(risk))
      return 13;
    if ([0].includes(risk))
      return 0;
  }

  getFibonacciSequenciAndSelectCard(risk: number) {
    var fibonacciSequenci = FibonacciSequenci.find(x => x.value == risk);
    if (fibonacciSequenci) {
      fibonacciSequenci.emojis = [...this.selectedUncertainty.emojis, ...this.selectedComplexity.emojis];
      this.selectCard(fibonacciSequenci);
    }
  }

  selectCard(fibonacciModel: FibonacciModel) {
    if (this.room && fibonacciModel.value != 0)
      this.userService.activeCardEvent(this.room, fibonacciModel);
  }

}
