import { Component, Input } from "@angular/core";
import { IRoomModel } from "src/app/interfaces/i-room.model";

@Component({ selector: 'app-votos-risk-report', template: '' })
export class VotosRiskReportComponentSpec {
    @Input() room?: IRoomModel;
}