import dbQuery from "../../config/database";
import { IPost } from "../../models/post";

export const CreatePost = async (post: Omit<IPost, "id" | "createdAt">) => {
  const { title, content, author } = post;
  const query = {
    text: `INSERT INTO Posts (title, content, author) VALUES ($1, $2, $3)`,
    values: [title, content, author],
  };

  const response = await dbQuery(query);

  return response;
};
