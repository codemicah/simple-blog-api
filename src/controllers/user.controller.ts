import { Request, Response } from "express";
import { body } from "express-validator";
import { errorResponse, successResponse } from "../utils/responseHandler";
import {
  CreateUser,
  GetAllUsers,
  GetUsersByMostPosts,
  UserExists,
} from "../services/UserService";
import { GetPosts } from "../services/PostService";

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

    return successResponse(res, 200, response);
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

    const response = await GetPosts({ author: id });

    return successResponse(res, 200, response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const getUsersByMostPosts = async (_req: Request, res: Response) => {
  try {
    const response = await GetUsersByMostPosts();

    return successResponse(res, 200, response);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
