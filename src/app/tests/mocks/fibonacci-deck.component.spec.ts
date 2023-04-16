import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FibonacciModel } from "src/app/classes/fibonacci.model";
import { FibonacciSequenci } from "src/app/components/fibonacci-deck/constants/fibonacci.model.const";

@Component({ selector: 'app-fibonacci-deck', template: '' })
export class FibonacciDeckComponentSpec {
    @Input() activeCard?: FibonacciModel = FibonacciSequenci.find(x => x.value == 1);
    @Output() activeCardEvent = new EventEmitter<FibonacciModel>();
}