import { body } from "express-validator";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { Request, Response } from "express";
import { GetPosts } from "../services/PostService";
import { CreateComment } from "../services/CommentService";

export const commentValidationRules = () => body("content").isString();

export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    // parse postId for strict validation
    const parsedPostId = Number(postId);

    if (!parsedPostId) {
      return errorResponse(res, 400, "Invalid post id");
    }

    const posts = await GetPosts({ id: parsedPostId });

    if (!posts.length) {
      return errorResponse(res, 404, "Post not found");
    }

    const comment = {
      content: req.body.content,
      postId: posts[0].id,
      userId: posts[0].author,
    };

    const response = await CreateComment(comment);
    return successResponse(res, 201, response);
  } catch (error: any) {
    errorResponse(res, 500, error.message);
  }
};
