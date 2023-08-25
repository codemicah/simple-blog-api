import dbQuery from "../../config/database";
import { IPost } from "../../models/post";

export const CreatePost = async (
  post: Omit<IPost, "id" | "createdAt">
): Promise<IPost> => {
  const { title, content, author } = post;
  const query = {
    text: `INSERT INTO Posts (title, content, author) VALUES ($1, $2, $3) RETURNING *`,
    values: [title, content, author],
  };

  const newPost = await dbQuery(query);

  const userUpdateQuery = {
    text: "UPDATE Users SET totalPosts = totalPosts + 1 WHERE id=$1",
    values: [author],
  };
  await dbQuery(userUpdateQuery);

  return newPost[0];
};
