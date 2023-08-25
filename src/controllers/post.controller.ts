import { Request, Response } from "express";
import { body } from "express-validator";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { CreatePost } from "../services/PostService";
import { UserExists } from "../services/UserService";

export const postValidationRules = () => [
  body(["title", "content"]).isString(),
];

export const createPost = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const { title, content } = req.body;
    // convert to number for struct checking
    const userId = Number(id);

    if (!userId || !UserExists({ id })) {
      return errorResponse(res, 400, "Invalid user id");
    }

    const post = { title, content, author: Number(id) };
    const response = await CreatePost(post);

    return successResponse(res, 201, response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
