import supertest from "supertest";
import app from "../app";
import dbQuery from "../config/database";

const request = supertest(app);

const testUserData = {
  id: -1,
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  password: "Password@123",
  token: "",
};

const testPostData = {
  id: -1,
  title: "My Post Title",
  content: "My post content",
};

beforeAll(() => {
  const query = {
    text: `DELETE FROM Users WHERE email=$1`,
    values: [testUserData.email],
  };
  return dbQuery(query);
});

test("Should create a user", async () => {
  return request
    .post("/users")
    .send(testUserData)
    .expect(201)
    .then((res) => {
      expect(res.body.firstname).toEqual(testUserData.firstName);
      expect(res.body.lastname).toEqual(testUserData.lastName);
      expect(res.body.email).toEqual(testUserData.email);
      expect(res.body.totalposts).toEqual(0);
      testUserData.id = res.body.id;
    });
});

test("Should login user", async () => {
  return request
    .post("/auth/login")
    .send({ email: testUserData.email, password: testUserData.password })
    .expect(200)
    .then((res) => {
      // save user token for subsequent requests
      testUserData.token = res.body.token;
    });
});

test("Should return all users", () => {
  return request
    .get("/users")
    .auth(testUserData.token, { type: "bearer" })
    .expect(200);
});

test("Should create post for a user", () => {
  return request
    .post(`/users/${testUserData.id}/posts`)
    .auth(testUserData.token, { type: "bearer" })
    .send(testPostData)
    .expect(201)
    .then((res) => {
      expect(res.body.title).toBe(testPostData.title);
      expect(res.body.content).toBe(testPostData.content);
      // save post id
      testPostData.id = res.body.id;
    });
});

test("Should add a comment to a post", async () => {
  return request
    .post(`/posts/${testPostData.id}/comments`)
    .auth(testUserData.token, { type: "bearer" })
    .send({ content: "This is a test comment" })
    .expect(201)
    .then((res) => {
      expect(res.body.content).toEqual("This is a test comment");
    });
});

test("Should return all user posts", () => {
  return request
    .get(`/users/${testUserData.id}/posts`)
    .auth(testUserData.token, { type: "bearer" })
    .expect(200);
});

test("Should fetch the top 3 users with the most posts and, for each of those users, the latest comment they made", () => {
  return request
    .get("/users/most-posts")
    .auth(testUserData.token, { type: "bearer" })
    .expect(200);
});
