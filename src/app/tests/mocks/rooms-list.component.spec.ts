import { Component, Input } from "@angular/core";
import { IRoomModel }       from "src/app/interfaces/i-room.model";

@Component({ selector: 'app-rooms-list', template: '' })
export class RoomsListComponentSpec {
    @Input() rooms: IRoomModel[];
}