import { Component, Input } from "@angular/core";
import { IRoomModel }       from "src/app/interfaces/i-room.model";

@Component({ selector: 'app-risk-matrix-uncertainty-complexity', template: '' })
export class RiskMatrixUncertaintyComplexityComponentSpec {
    @Input() room                     : IRoomModel;
    @Input() setUncertaintyAndCalcRisk: number;
    @Input() setComplexityAndCalcRisk : number;
}