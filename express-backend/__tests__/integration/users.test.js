const supertest = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

// require("dotenv").config();

const fakeUser = {
  name: "Testing",
  email: "test@test.com",
  password: "testing12345",
};

const fakeUserLogin = {
  email: "test@test.com",
  password: "testing12345",
};

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Testing User Routes", () => {
  describe("User Registration", () => {
    it("User that doesn't exist should be able to create an account and get a 200 status code", async () => {
      const response = await supertest(app)
        .post("/api/users/register")
        .send(fakeUser);

      expect(response.statusCode).toBe(200);
    });

    it("User with missing credentials should get a 400 status code", async () => {
      const response = await supertest(app).post("/api/users/register").send({
        name: "Testing",
        email: "test@test.com",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Please fill in the missing fields.");
    });

    it("User with password length less than 8 characters long should get a 400 status code", async () => {
      const response = await supertest(app).post("/api/users/register").send({
        name: "Testing",
        email: "test@test.com",
        password: "test",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Password must contain 8 characters.");
    });

    it("User with an email that is already in use should not be able to create an account and should get a 400 status code", async () => {
      const response = await supertest(app)
        .post("/api/users/register")
        .send(fakeUser);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        "A user with that email already exists. Please use a different email address."
      );
    });
  });

  describe("User Login", () => {
    it("User that already exist should be able to login and get a 200 status code.", async () => {
      const response = await supertest(app)
        .post("/api/users/login")
        .send(fakeUserLogin);

      expect(response.statusCode).toBe(200);
    });

    it("User that does not exist shouldn't be able to login and get a 400 status code.", async () => {
      const response = await supertest(app).post("/api/users/login").send({
        email: "test@example.com",
        password: "testing12345",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        "This user does not exist. Please sign up."
      );
    });

    it("User with missing credentials shouldn't be able to login and get a 400 status code.", async () => {
      const response = await supertest(app).post("/api/users/login").send({
        email: "test@test.com",
        password: "",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Please fill in the missing fields.");
    });
  });
});
