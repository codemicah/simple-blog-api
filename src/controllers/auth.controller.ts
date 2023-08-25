import { Request, Response } from "express";
import { body } from "express-validator";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { GenerateToken } from "../services/AuthService";
import { UserExists } from "../services/UserService";
import { compare } from "bcrypt";

export const loginValidationRules = () => [
  body("email").isEmail(),
  body("password").isStrongPassword(),
];

// login to generate a token
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserExists({ email });

    if (!user) {
      return errorResponse(res, 400, "Invalid credentials");
    }

    if (!(await compare(password, user.password))) {
      return errorResponse(res, 400, "Invalid credentials");
    }

    const token = GenerateToken(user);

    return successResponse(res, 200, { token });
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
