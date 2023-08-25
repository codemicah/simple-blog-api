import { Router } from "express";
import {
  commentValidationRules,
  createComment,
} from "../controllers/comment.controller";
import validateRequest from "../middlewares/requestValidator";

const router = Router();

router.post(
  "/:postId/comments",
  commentValidationRules(),
  validateRequest,
  createComment
);

export default router;
