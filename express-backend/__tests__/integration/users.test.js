const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const User = require("../../models/userModel");

require("dotenv").config();

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
  mongoose.connect(process.env.MONGO_DB_TEST_URI);
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Testing User Routes", () => {
  describe("User Registration", () => {
    it("User that doesn't exist should be able to create an account and get a 201 status code", async () => {
      const response = await supertest(app)
        .post("/api/users/register")
        .send(fakeUser);

      expect(response.statusCode).toBe(201);

      // Checking if the user payload and the user in the database have the same email to validate that the user is logged in
      const user = await User.findById(response.body._id);
      expect(response.body.email).toBe(user.email);
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

      // Checking if the user payload and the user in the database have the same email to validate that the user is logged in
      const user = await User.findById(response.body._id);
      expect(response.body.email).toBe(user.email);
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
