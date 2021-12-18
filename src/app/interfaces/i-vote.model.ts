import { IFibonacciModel } from "./i-fibonacci.model";

export interface IVoteModel {
  uid        : string;
  displayName: string;
  value      : IFibonacciModel;
}
