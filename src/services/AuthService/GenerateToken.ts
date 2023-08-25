import { sign } from "jsonwebtoken";
import { IUser } from "../../models/user";
import { config } from "../../config/env";

const { JWT_SECRET } = config;

export const GenerateToken = (user: IUser) => {
  const token = sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

  return token;
};
