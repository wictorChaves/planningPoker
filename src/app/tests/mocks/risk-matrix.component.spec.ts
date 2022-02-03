import { Component, Input } from "@angular/core";
import { IRoomModel }       from "src/app/interfaces/i-room.model";

@Component({ selector: 'app-risk-matrix', template: '' })
export class RiskMatrixComponentSpec {
    @Input() room: IRoomModel;
}