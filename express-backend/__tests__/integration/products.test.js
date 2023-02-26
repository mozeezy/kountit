const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const User = require("../../models/userModel");
const Product = require("../../models/productModel");

const userId = new mongoose.Types.ObjectId().toString();

require("dotenv").config();

const userPayload = {
  _id: userId,
  email: "testing@testing.com",
  name: "Testing 123",
  password: "testingtest1234",
};

const productPayload = {
  user: userId,
  name: "fake-product",
  category: "fake-category",
  quantity: "123",
  price: "123",
  location: "123",
  description: "this is a test product",
};

const productResponseObject = {
  __v: 0,
  _id: expect.any(String),
  category: "fake-category",
  createdAt: expect.any(String),
  description: "this is a test product",
  location: "123",
  name: "fake-product",
  price: "123",
  quantity: "123",
  sku: "SKU",
  updatedAt: expect.any(String),
  user: expect.any(String),
};

beforeAll(async () => {
  mongoose.connect(process.env.MONGO_DB_TEST_URI);
  await User.deleteMany();
  await Product.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Given that user is logged out", () => {
  it("Should return a 401 status code if a logged out user attempted to create a product", async () => {
    const response = await supertest(app)
      .post("/api/products/")
      .send(productPayload);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe(
      "You're not authorized to access this page. Please login to view the page."
    );
  });
});

describe("Given that the user is logged in", () => {
  let jwt = "";
  beforeAll(async () => {
    const response = await supertest(app)
      .post("/api/users/register")
      .send(userPayload);
    jwt = response.body.token;
  });

  it("Should return a 201 status code if a valid user attempted to create a product", async () => {
    const response = await supertest(app)
      .post("/api/products")
      .set("Cookie", [`token=${jwt}`])
      .send(productPayload);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(productResponseObject);
  });

  it("User should be able to get all of their products", async () => {
    const response = await supertest(app)
      .get("/api/products/all-products")
      .set("Cookie", [`token=${jwt}`]);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([productResponseObject]);
  });

  it("Given that the product does not exist, user should get a 404 status code", async () => {
    const productId = new mongoose.Types.ObjectId().toString();
    const response = await supertest(app)
      .get(`/api/products/${productId}`)
      .set("Cookie", [`token=${jwt}`]);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("This product does not exist.");
  });

  it("Given that the product exists, user should be able to fetch it and get a 200 status code", async () => {
    const createProduct = await supertest(app)
      .post("/api/products")
      .set("Cookie", [`token=${jwt}`])
      .send(productPayload);

    const productId = createProduct.body._id;

    const response = await supertest(app)
      .get(`/api/products/${productId}`)
      .set("Cookie", [`token=${jwt}`]);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      _id: productId,
      user: expect.any(String),
      name: "fake-product",
      sku: "SKU",
      category: "fake-category",
      quantity: "123",
      price: "123",
      description: "this is a test product",
      location: "123",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      __v: 0,
    });
  });
});
