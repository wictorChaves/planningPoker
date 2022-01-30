import { FibonacciModel } from "src/app/classes/fibonacci.model";
import { IVoteModel }     from "../interfaces/i-vote.model";

export class VoteModel implements IVoteModel {
  uid        : string;
  displayName: string;
  value      : FibonacciModel;
}
