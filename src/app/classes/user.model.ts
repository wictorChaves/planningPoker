import { IUserModel } from "../interfaces/i-user.model";

export class UserModel implements IUserModel {
  uid        : string;
  displayName: string;
  email      : string;
}
