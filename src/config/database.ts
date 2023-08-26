import { Pool, PoolClient, QueryConfig } from "pg";
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

pool.on("connect", async (client) => {
  await setUpSchemas(client);
});

// function to facilitate queries
const dbQuery = async (query: QueryConfig) => {
  const response = await pool.query(query);
  return response.rows;
};

async function setUpSchemas(client: PoolClient) {
  // create Users table
  client.query(userSchema);
  // create Posts table
  client.query(postSchema);
  // create Comments table
  client.query(commentSchema);
  // create indexes
  client.query({
    text: `CREATE INDEX IF NOT EXISTS idx_total_posts ON Users (totalPosts)`,
  });
  client.query({
    text: `CREATE INDEX IF NOT EXISTS idx_post_author ON Posts (author)`,
  });
  client.query({
    text: `CREATE INDEX IF NOT EXISTS idx_comment ON Comments (createdAt, userId, postId)`,
  });
}

export default dbQuery;
