import dbQuery from "../../config/database";

export const GetAllUsers = async () => {
  const query = {
    text: "SELECT id,firstName, lastName, email, totalPosts FROM Users",
  };

  const users = await dbQuery(query);

  return users;
};

export const UserExists = async (email: string) => {
  const query = { text: `SELECT * FROM Users WHERE email=$1`, values: [email] };
  const response = await dbQuery(query);

  if (response.length) return true;
  return false;
};
