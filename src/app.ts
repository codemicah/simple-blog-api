import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import authRouter from "./routes/auth";

const app = express();

// for security enhancement
app.use(helmet());
// allow cors
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use("*", (req: Request, res: Response) => {
  const path = req.originalUrl;
  const method = req.method;
  return res.status(404).json({
    error: true,
    path,
    method,
    message: `The method ${method} is not defined on path ${path}`,
  });
});

export default app;
