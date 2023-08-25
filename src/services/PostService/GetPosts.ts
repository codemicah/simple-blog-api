import dbQuery from "../../config/database";

export const GetAllUserPosts = async (userId: string) => {
  const query = {
    text: "SELECT * FROM Posts WHERE author = $1 ORDER BY createdAt DESC",
    values: [userId],
  };

  const response = await dbQuery(query);
  return response;
};
