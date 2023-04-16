import { Component, Input } from "@angular/core";
import { IRoomModel } from "src/app/interfaces/i-room.model";

@Component({ selector: 'app-votes-cards', template: '' })
export class VotesCardsComponentSpec {
    @Input() isFlip: boolean = false;
    @Input() room?: IRoomModel;
}