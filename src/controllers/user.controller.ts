import { Request, Response } from "express";
import { body } from "express-validator";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { CreateUser, GetAllUsers, UserExists } from "../services/UserService";
import { GetAllUserPosts } from "../services/PostService";

export const userValidationRules = () => [
  body(["firstName", "lastName"]).isString(),
  body("email").isEmail(),
  body("password").isStrongPassword(),
];

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (await UserExists({ email })) {
      return errorResponse(res, 409, "User exists");
    }

    const userData = { firstName, lastName, email, password };

    const response = await CreateUser(userData);

    return successResponse(res, 201, response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const response = await GetAllUsers();

    return successResponse(res, 201, response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const getAllUserPosts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // convert to number for struct checking
    const userId = Number(id);

    if (!userId || !UserExists({ id })) {
      return errorResponse(res, 400, "Invalid user id");
    }

    const response = await GetAllUserPosts(id);

    return successResponse(res, 201, response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
