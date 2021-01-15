import { FibonacciModel } from "src/app/models/fibonacci.model";

export interface VoteModel {
  uid        : string;
  displayName: string;
  value      : FibonacciModel;
}
