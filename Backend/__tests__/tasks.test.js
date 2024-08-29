const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("Task Routes", () => {
  let createdTaskId;
  const userEmail = "testuser@example.com"; 

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("POST /api/task/create", () => {
    it("should create a new task successfully", async () => {
      const response = await request(app).post("/api/task/create").send({
        name: "Test Task",
        email: userEmail,
        discrption: "Task description",
        stats: "pending",
        manager: "mstafa@gmail.com",
      });

      expect(response.status).toBe(200);
      expect(response.text).toBe("Task made successfully");
    });
  });

  describe("DELETE /api/task/:id", () => {
    it("should delete a task successfully", async () => {
      const createResponse = await request(app).post("/api/task/create").send({
        name: "Task to Delete",
        email: userEmail,
        discrption: "Task description",
        stats: "pending",
        manager: "mstafa@gmail.com",
      });

      if (createResponse.body._id) {
        createdTaskId = createResponse.body._id;
      } else {
        createdTaskId = "66cfd263b1c538f7ec06c98d";
      }
      const deleteResponse = await request(app)
        .delete(`/api/task/${createdTaskId}`)
        .send();

      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body).toHaveProperty(
        "message",
        "Task Deleted successfully"
      );
    });
  });

  describe("PUT /api/task/:id", () => {
    it("should update a task successfully", async () => {
      const updateResponse = await request(app)
        .put(`/api/task/66cfc7f3bee71c7c06434770`)
        .send({ stats: "completed" });

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body).toHaveProperty("stats", "completed");
    });
  });
});
