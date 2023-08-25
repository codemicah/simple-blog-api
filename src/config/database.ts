import { Pool, QueryConfig } from "pg";
import { config } from "./env";
import { userSchema } from "../models/user";
import { postSchema } from "../models/post";
import { commentSchema } from "../models/comment";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = config;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  allowExitOnIdle: true,
});

pool.on("error", (err, _client) => {
  console.error("An unexpected error occured", err);
  process.exit(-1);
});

pool.on("connect", (client) => {
  // create Users table
  client.query(userSchema);
  // create Posts table
  client.query(postSchema);
  // create Comments table
  client.query(commentSchema);
});

// function to facilitate queries
const dbQuery = async (query: QueryConfig) => {
  const response = await pool.query(query);
  return response.rows;
};

export default dbQuery;
