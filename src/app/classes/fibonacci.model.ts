import { IFibonacciModel } from "../interfaces/i-fibonacci.model";

export class FibonacciModel implements IFibonacciModel {
  value      : number;
  description: string;
  class      : string;
  emojis?    : string[];
}
