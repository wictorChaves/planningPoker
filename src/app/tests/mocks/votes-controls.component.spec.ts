import { Component, Input } from "@angular/core";
import { IRoomModel }       from "src/app/interfaces/i-room.model";

@Component({ selector: 'app-votes-controls', template: '' })
export class VotesControlsComponentSpec {
    @Input() room  : IRoomModel;
    @Input() isFlip: boolean = false;
    @Input() roomId: string = '';
}