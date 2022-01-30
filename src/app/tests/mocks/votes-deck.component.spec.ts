import { Component, Input } from "@angular/core";
import { IRoomModel }       from "src/app/interfaces/i-room.model";

@Component({ selector: 'app-votes-deck', template: '' })
export class VotesDeckComponentSpec {
    @Input() room: IRoomModel;
}