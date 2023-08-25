interface IComment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: Date;
}

const commentSchema = `
  CREATE TABLE IF NOT EXISTS Comments (
    id SERIAL PRIMARY KEY,
    postId INT REFERENCES posts(id),
    userId INT REFERENCES users(id),
    content TEXT,
    createdAt TIMESTAMP DEFAULT NOW()
  )
`;

export { IComment, commentSchema };
