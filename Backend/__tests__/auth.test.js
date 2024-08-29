const request = require("supertest");
const app = require("../app"); 
const mongoose = require("mongoose"); 
const { MongoURI } = require("../config/keys");
const db = MongoURI;

beforeAll(async () => {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  let agent;

  beforeAll(() => {
    agent = request.agent(app); 
  });

  describe("POST /api/user/login", () => {
    it("should log in successfully with correct credentials", async () => {
      const response = await agent
        .post("/api/user/login")
        .send({ email: "mstafa@gmail.com", password: "12345678" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success", true);
    });

    it("should fail to log in with incorrect credentials", async () => {
      const response = await agent
        .post("/api/user/login")
        .send({ email: "mstafa@gmail.com", password: "wrongpassword" });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Incorrect email or password"
      );
    });
  });

  describe("GET /api/user/logout", () => {
    it("should log out successfully", async () => {
      const response = await agent.get("/api/user/logout");
      expect(response.status).toBe(200);
    });
  });
});
