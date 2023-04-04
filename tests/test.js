const server = require("../src/index");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);
const mongoose = require("mongoose");

describe("Webhook Endpoint", () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
  });

  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  it("/Post should send data to Excel and DB", async () => {
    const res = await requestWithSupertest.post("/webhook").send({
      name: "test",
      age: 30,
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("Status");
  });
});
