import { Component, Input } from "@angular/core";
import { IRoomModel } from "src/app/interfaces/i-room.model";

@Component({ selector: 'app-rooms-form', template: '' })
export class RoomsFormComponentSpec {
    @Input() rooms?: IRoomModel[];
}