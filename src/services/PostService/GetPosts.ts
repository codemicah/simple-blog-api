import { IPost } from "../../models/post";
import dbQuery from "../../config/database";

export const GetPosts = async (
  filter: Partial<Record<keyof IPost, any>>
): Promise<IPost[]> => {
  // contruct an SQL query from the filter
  let queryFilter = "";
  const values = [];
  const keys = Object.keys(filter);

  // loop through the keys and match the values
  for (let i = 0; i < keys.length; i++) {
    // append 'AND' for multiple filters
    if (queryFilter.length) {
      queryFilter += " AND ";
    } else queryFilter += " WHERE ";

    queryFilter += `${keys[i]}=$${i + 1}`;
    values.push(Object.values(filter)[i]);
  }

  const query = { text: `SELECT * FROM Posts ${queryFilter}`, values };

  const response = await dbQuery(query);
  return response;
};
