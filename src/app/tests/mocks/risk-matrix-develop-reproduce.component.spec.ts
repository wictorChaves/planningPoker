import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RiskModel }                              from "src/app/pages/risk-matrix/model/risk.model";

@Component({ selector: 'app-risk-matrix-develop-reproduce', template: '' })
export class RiskMatrixDevelopReproduceComponentSpec {
    @Input() info = {
        label: '',
        first: {
            icons      : ['🤙', '🤞', '👎'],
            label      : '',
            description: ''
        },
        second: {
            icons      : ['😎', '😅', '😲'],
            label      : '',
            description: ''
        }
    };
    @Output() listenerRisk: EventEmitter<RiskModel> = new EventEmitter<RiskModel>();
}