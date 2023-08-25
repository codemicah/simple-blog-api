import dbQuery from "../../config/database";
import { IComment } from "../../models/comment";

export const CreateComment = async (
  comment: Omit<IComment, "id" | "createdAt">
): Promise<IComment> => {
  const { content, postId, userId } = comment;

  const query = {
    text: `
    INSERT INTO Comments (content, postId, userId) VALUES ($1, $2, $3) 
    RETURNING *`,
    values: [content, postId, userId],
  };
  const response = await dbQuery(query);

  return response[0];
};
