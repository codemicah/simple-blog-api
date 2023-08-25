import { Router } from "express";
import {
  commentValidationRules,
  createComment,
} from "../controllers/comment.controller";
import validateRequest from "../middlewares/requestValidator";
import { auth } from "../auth/auth";

const router = Router();
router.use(auth);

router.post(
  "/:postId/comments",
  commentValidationRules(),
  validateRequest,
  createComment
);

export default router;
