import { Component, EventEmitter, Output } from "@angular/core";
import { FibonacciModel }                  from "src/app/classes/fibonacci.model";

@Component({ selector: 'app-fibonacci-deck', template: '' })
export class FibonacciDeckComponentSpec {
    @Output() activeCardEvent = new EventEmitter<FibonacciModel>();
}