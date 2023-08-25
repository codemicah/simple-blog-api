import { Router } from "express";
import {
  createUser,
  getAllUserPosts,
  getAllUsers,
  getUsersByMostPosts,
  userValidationRules,
} from "../controllers/user.controller";
import validateRequest from "../middlewares/requestValidator";
import {
  createPost,
  postValidationRules,
} from "../controllers/post.controller";
import { auth } from "../auth/auth";

const router = Router();

router.post("/", userValidationRules(), validateRequest, createUser);

router.get("/", auth, getAllUsers);

router.get("/most-posts", auth, getUsersByMostPosts);

router.post(
  "/:id/posts",
  auth,
  postValidationRules(),
  validateRequest,
  createPost
);

router.get("/:id/posts", auth, getAllUserPosts);

export default router;
