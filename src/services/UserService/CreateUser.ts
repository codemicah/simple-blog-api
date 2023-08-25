import { IUser } from "../../models/user"; // Import the User interface
import { hash } from "bcrypt";
import dbQuery from "../../config/database";

export const CreateUser = async (
  user: Omit<IUser, "id" | "createdAt" | "totalPosts">
): Promise<IUser> => {
  const { firstName, lastName, email, password } = user;

  const passwordHash = await hash(password, 10);

  const query = {
    text: `
    INSERT INTO Users (firstName, lastName, email, password)
    VALUES ($1, $2, $3, $4) 
    RETURNING firstName, lastName, email, totalPosts
  `,
    values: [firstName, lastName, email, passwordHash],
  };

  const response = await dbQuery(query);

  return response[0];
};
