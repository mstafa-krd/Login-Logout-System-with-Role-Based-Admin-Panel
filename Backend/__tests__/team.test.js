const request = require("supertest");
const app = require("../app"); 

describe("Team Routes", () => {
  describe("PUT /api/user/team/:id", () => {
    it("should update a team member", async () => {
      const response = await request(app)
        .put("/api/user/team/66cfc428aca9b8998166b296") 
        .send({ role: "manager" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("role", "manager");
    });
  });
});
