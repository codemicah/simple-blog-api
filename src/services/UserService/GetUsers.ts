import { IUser } from "../../models/user";
import dbQuery from "../../config/database";

export const GetAllUsers = async (): Promise<IUser[]> => {
  const query = {
    text: `
    SELECT id,firstName, lastName, email, totalPosts 
    FROM Users`,
  };

  const users = await dbQuery(query);

  return users;
};

export const UserExists = async (
  filter: Partial<Record<keyof IUser, any>>
): Promise<IUser | undefined> => {
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

  return response[0];
};

export const GetUsersByMostPosts = async (limit = 3) => {
  const query = {
    text: `
    SELECT
    u.id,
    u.firstName,
    u.lastName,
    u.totalPosts,
    json_build_object(
      'content', c.content
    ) AS latestComment
    FROM Users u
    LEFT JOIN LATERAL (
      SELECT content
      FROM Comments com
      WHERE com.userId = u.id
      ORDER BY com.createdAt DESC
      LIMIT 1
    ) c ON TRUE
    WHERE totalPosts > 0
    ORDER BY u.totalPosts DESC
    LIMIT 3`,
  };

  const response = await dbQuery(query);

  return response;
};
