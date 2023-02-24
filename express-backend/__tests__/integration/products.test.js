const supertest = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
// const userId = new mongoose.Types.ObjectId().toString();

// require("dotenv").config();

const fakeUser = {
  name: "Testing",
  email: "test@test.com",
  password: "testing12345",
};

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  const response = await supertest(app)
    .post("/api/users/register")
    .send(fakeUser);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Testing Product Routes", () => {
  it("should return a 401 status code if a logged out user tried to create a product", async () => {
    const { statusCode, body } = await supertest(app)
      .post("/api/products/")
      .send({});

    expect(statusCode).toBe(401);
    expect(body.message).toBe(
      "You're not authorized to access this page. Please login to view the page."
    );
  });

  // it("should return a 200 status code if the user is logged and tried to create a product", async () => {
  //   const {statusCode } = await supertest(app).post()
  // });
});
