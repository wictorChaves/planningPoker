import { Component, Input, OnInit } from '@angular/core';
import { FibonacciModel }           from 'src/app/classes/fibonacci.model';
import { FibonacciSequenci }        from 'src/app/components/fibonacci-deck/constants/fibonacci.model.const';
import { IRoomModel }               from 'src/app/interfaces/i-room.model';
import { VoteService }              from 'src/app/services/vote.service';
import { RickModel }                from '../model/risk.model';

@Component({
  selector   : 'app-risk-matrix-uncertainty-complexity',
  templateUrl: './risk-matrix-uncertainty-complexity.component.html',
  styleUrls  : ['./risk-matrix-uncertainty-complexity.component.scss']
})
export class RiskMatrixUncertaintyComplexityComponent implements OnInit {

  @Input() set setUncertaintyAndCalcRisk(value: RickModel) {
    this.setUncertainty(value);
    this.calcRisk();
  }

  @Input() set setComplexityAndCalcRisk(value: RickModel) {
    this.setComplexity(value);
    this.calcRisk();
  }

  @Input() room             : IRoomModel;
  public selectedUncertainty: RickModel = { value: 0, emojis: [] };
  public selectedComplexity : RickModel = { value: 0, emojis: [] };
  public risk               : RickModel = { value: 0, emojis: [] };

  constructor(private userService: VoteService) { }

  ngOnInit() {
  }

  getEmojis(selectedUncertainty: RickModel, selectedComplexity: RickModel) {
    return [...selectedUncertainty.emojis, ...selectedComplexity.emojis].join('');
  }

  setUncertainty(risk: RickModel) {
    this.selectedUncertainty = risk;
  }

  setComplexity(risk: RickModel) {
    this.selectedComplexity = risk;
  }

  buildRisk() {
    var rickModel        = new RickModel();
        rickModel.value  = this.selectedUncertainty.value * this.selectedComplexity.value;
        rickModel.emojis = [...this.selectedUncertainty.emojis, ... this.selectedComplexity.emojis];
    return rickModel;
  }

  calcRisk() {
        this.risk = this.buildRisk();
    var risk      = this.getMatrixRick(this.risk.value);
    this.getFibonacciSequenciAndSelectCard(risk);
  }

  getMatrixRick(risk: number): number {
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
    var fibonacciSequenci        = FibonacciSequenci.find(x => x.value == risk);
        fibonacciSequenci.emojis = [...this.selectedUncertainty.emojis, ...this.selectedComplexity.emojis];
    if (fibonacciSequenci)
      this.selectCard(fibonacciSequenci);
  }

  selectCard(fibonacciModel: FibonacciModel) {
    if (this.room && fibonacciModel.value != 0)
      this.userService.activeCardEvent(this.room, fibonacciModel);
  }

}
