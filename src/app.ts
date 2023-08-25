import express from "express";
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

export default app;
