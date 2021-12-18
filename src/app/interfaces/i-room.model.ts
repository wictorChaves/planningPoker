import { IUserModel } from "./i-user.model";
import { IVoteModel } from "./i-vote.model";

export interface IRoomModel {
  id          : string;
  name        : string;
  average     : string;
  isFlip      : boolean;
  participants: IUserModel[];
  votes       : IVoteModel[];
  tasks       : string[];
}
