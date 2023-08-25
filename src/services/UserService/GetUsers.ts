import { IUser } from "../../models/user";
import dbQuery from "../../config/database";

export const GetAllUsers = async () => {
  const query = {
    text: "SELECT id,firstName, lastName, email, totalPosts FROM Users",
  };

  const users = await dbQuery(query);

  return users;
};

export const UserExists = async (filter: Partial<Record<keyof IUser, any>>) => {
  // contruct an SQL query from the filter
  let queryFilter = "";
  const values = [];
  const keys = Object.keys(filter);

  // loop through the keys and match the values
  for (let i = 0; i < keys.length; i++) {
    // append 'AND' for multiple filters
    if (queryFilter.length) {
      queryFilter += " AND ";
    }
    queryFilter += `${keys[i]}=$${i + 1}`;
    values.push(Object.values(filter)[i]);
  }

  const query = { text: `SELECT * FROM Users WHERE ${queryFilter}`, values };

  const response = await dbQuery(query);

  if (response.length) return true;
  return false;
};
