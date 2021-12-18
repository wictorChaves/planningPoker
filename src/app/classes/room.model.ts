import { IRoomModel } from "../interfaces/i-room.model";
import { UserModel }  from "./user.model";
import { VoteModel }  from "./vote.model";

export class RoomModel implements IRoomModel {
  id          : string;
  name        : string;
  average     : string;
  isFlip      : boolean;
  participants: UserModel[];
  votes       : VoteModel[];
  tasks       : string[];
}
