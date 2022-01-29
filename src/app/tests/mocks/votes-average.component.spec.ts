import { Component, Input } from "@angular/core";
import { IRoomModel }       from "src/app/interfaces/i-room.model";

@Component({ selector: 'app-votes-average', template: '' })
export class VotesAverageComponentSpec {
    @Input() room: IRoomModel;
}