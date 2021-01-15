import { UserModel } from "./user.model";
import { VoteModel } from "./vote.model";

export interface RoomModel {
  id          : string;
  name        : string;
  average     : string;
  isFlip      : boolean;
  participants: UserModel[];
  votes       : VoteModel[];
}
