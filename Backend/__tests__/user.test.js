const request = require("supertest");
const app = require("../app"); 
describe("User Routes", () => {
  let userId;

  

  describe("POST /api/user/create", () => {
    it("should create a new user successfully", async () => {
      const response = await request(app).post("/api/user/create").send({
        name: "Test User",
        email: "testuser9@example.com",
        password: "password123",
        role: "normal-user",
        manager: null,
      });

      expect(response.status).toBe(200);
      expect(response.text).toBe("User registered successfully");
    });
  });

  describe("GET /api/user/users", () => {
    it("should get all users", async () => {
      const response = await request(app).get("/api/user/users");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /api/user/:id", () => {
    it("should update an existing user", async () => {
      const response = await request(app)
        .put("/api/user/66ce6112855768a595f4de6f") 
        .send({ name: "Updated Name" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "Updated Name");
    });
  });

  describe("DELETE /api/user/:id", () => {
    it("should delete an existing user", async () => {
      
      const response = await request(app)
        .delete("/api/user/66cfcdaafb25085fe02c2870") 
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "User Deleted successfully "
      );
    });
  });

  describe("GET /api/user/:id", () => {
    it("should get a user by ID", async () => {
      const response = await request(app).get(
        "/api/user/66ce6112855768a595f4de6f"
      ); 
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("email", "michael.brown@gmail.com");
    });
  });
});
