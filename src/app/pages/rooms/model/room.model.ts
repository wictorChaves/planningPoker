import { UserModel } from "./user.model";
import { VoteModel } from "./vote.model";

export interface RoomModel {
  id          : string;
  name        : string;
  participants: UserModel[];
  votes       : VoteModel[];
}
