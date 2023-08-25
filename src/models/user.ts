interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  totalPosts: number;
  createdAt: Date;
}

const userSchema = `
  CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    totalPosts INT DEFAULT 0 ,
    createdAt TIMESTAMP DEFAULT NOW()
  )
`;

export { IUser, userSchema };
