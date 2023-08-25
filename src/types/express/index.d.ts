import { IUser } from "src/models/user";
import { IUserAuthInfoRequest } from "../../interface";

declare global {
  export namespace Express {
    interface Request {
      user: Pick<IUser, "id">;
    }
  }
}
