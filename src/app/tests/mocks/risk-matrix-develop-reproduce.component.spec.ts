import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({ selector: 'app-risk-matrix-develop-reproduce', template: '' })
export class RiskMatrixDevelopReproduceComponentSpec {
    @Input () developmentLabel: string       = '';
    @Input () toProduceLabel: string         = '';
    @Input () matrixLabel: string            = '';
    @Output() riskEmit: EventEmitter<number> = new EventEmitter<number>();
}