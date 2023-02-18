const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

// require("dotenv").config();

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Testing Users Routes", () => {
  describe("User Registration", () => {
    it("User that doesn't exist should be able to create an account", async () => {
      const fakeUser = await supertest(app).post("/api/users/register").send({
        name: "Testing",
        email: "test@test.com",
        password: "testing12345",
      });

      expect(fakeUser.statusCode).toBe(200);
    });

    it("User with missing credentials shouldn't be able to create an account", async () => {
      const fakeUser = await supertest(app).post("/api/users/register").send({
        name: "Testing",
        email: "test@test.com",
      });

      expect(fakeUser.statusCode).toBe(400);
    });

    it("User with password length less than 8 characters long should get a 400 status code error", async () => {
      const fakeUser = await supertest(app).post("/api/users/register").send({
        name: "Testing",
        email: "test@test.com",
        password: "test",
      });

      expect(fakeUser.statusCode).toBe(400);
    });

    // Work on this test -> returns status code 200 when it should return 400 since the email already exists. Possible issue: since these calls are being made to a mongodb database in memory, it is possible that after every instance of testing and when the server is closed, then all data is deleted.
    it("User with an email that is already in use should not be able to create an account", async () => {
      const fakeUser = await supertest(app).post("/api/users/register").send({
        name: "Testing",
        email: "jane@doe.com",
        password: "testing12345",
      });

      console.log(fakeUser);

      expect(fakeUser.statusCode).toBe(400);
    });
  });
});

// What to test
// 1.) Test that users can register
// 2.) Test that users can login
// 3.) Test that users can create new products once they're logged in
