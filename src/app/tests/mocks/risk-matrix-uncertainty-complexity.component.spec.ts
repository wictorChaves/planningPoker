import { Component, Input } from "@angular/core";
import { IRoomModel } from "src/app/interfaces/i-room.model";
import { RiskModel } from "src/app/pages/risk-matrix/model/risk.model";

@Component({ selector: 'app-risk-matrix-uncertainty-complexity', template: '' })
export class RiskMatrixUncertaintyComplexityComponentSpec {
    @Input() setUncertaintyAndCalcRisk?: RiskModel;
    @Input() setComplexityAndCalcRisk?: RiskModel;
    @Input() room?: IRoomModel;
}