import { Router } from "express";
import {
  createUser,
  getAllUserPosts,
  getAllUsers,
  userValidationRules,
} from "../controllers/user.controller";
import validateRequest from "../middlewares/requestValidator";
import {
  createPost,
  postValidationRules,
} from "../controllers/post.controller";

const router = Router();

router.post("/", userValidationRules(), validateRequest, createUser);

router.get("/", getAllUsers);

router.post("/:id/posts", postValidationRules(), validateRequest, createPost);

router.get("/:id/posts", getAllUserPosts);

export default router;
