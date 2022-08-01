import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

// jest.useFakeTimers({
//   legacyFakeTimers: true,
// });

declare global {
  var signin: (id?: string) => string[];
}

jest.mock("../nats-wrapper.ts");

let mongo: any;

process.env.STRIPE_KEY =
  "sk_test_51LPtdJLkfKsly3R2JzcWNBe1GMSlfENUaoLvqZu5fvjSruro12LY3Ab8u2WdemG6pdBEES3rrSTqAi2hX0loDEJq00wQAR0I0G";

beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  //Runs before each of our tests
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // Build a JTW payload. { id, email }
  // const id = new mongoose.Types.ObjectId().toHexString();

  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
