interface IPost {
  id: number;
  author: number;
  title: string;
  content: string;
  createdAt: Date;
}

const postSchema = `
    CREATE TABLE IF NOT EXISTS Posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author INT REFERENCES users(id),
        createdAt TIMESTAMP DEFAULT NOW()
    )`;

export { IPost, postSchema };
