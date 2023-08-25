import { Router } from "express";
import {
  createUser,
  getAllUsers,
  userValidationRules,
} from "../controllers/user.controller";
import validateRequest from "../utils/requestValidator";

const router = Router();

router.post("/", userValidationRules(), validateRequest, createUser);

router.get("/", getAllUsers);

export default router;
