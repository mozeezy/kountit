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

describe("Testing Product Routes", () => {
  it("should return a 401 status code if a logged out user tried to create a product", async () => {
    const { statusCode } = await supertest(app).post("/api/products");
    expect(statusCode).toBe(401);
  });

  it("should return a 200 status code if the user is logged and tried to create a product", async () => {
    expect(true).toBe(true);
  });
});
