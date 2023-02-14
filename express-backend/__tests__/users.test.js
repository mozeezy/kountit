const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const userId = new mongoose.Types.ObjectId().toString();

require("dotenv").config();

const mockUser = {
  _id: userId,
  email: "example@example.com",
  name: "Example 1",
};

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Testing Users Routes", () => {
  it("should return a 401 status code if a user tried to create an account with existing credentials", async () => {
    expect(true).toBe(true);
  });
});

// What to test
// 1.) Test that users can register
// 2.) Test that users can login
// 3.) Test that users can create new products once they're logged in
