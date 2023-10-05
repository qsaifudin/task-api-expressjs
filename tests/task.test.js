const request = require("supertest"); // Using supertest instead of chai-http for Jest

// Import your Express app
const app = require("../app.js");

// Example test suite for a tasks API
describe("Tasks API", () => {
  let taskId;

  // Test the POST /API/v1/tasks route (create a new task)
  it("should create a new task", async () => {
    const newTask = {
      title: "Test Task",
      description: "This is a test task.",
      completed: false,
    };

    const response = await request(app).post("/API/v1/tasks").send(newTask);
    console.log("🚀 ~ file: task.test.js:19 ~ it ~ response:", response);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", true);
    expect(response.body).toHaveProperty("data");
    taskId = response.body.data.id; // Store the task ID for later tests
  });

  // Test the GET /API/v1/tasks route (get all tasks)
  it("should get all tasks", async () => {
    const response = await request(app).get("/API/v1/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", true);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("pagination");
    const { data, pagination } = response.body;
    expect(Array.isArray(data)).toBe(true);
    expect(typeof pagination.page).toBe("number");
    expect(typeof pagination.pageSize).toBe("number");
    expect(typeof pagination.totalItems).toBe("number");
    expect(typeof pagination.totalPages).toBe("number");
  });

  // Test the GET /API/v1/tasks/:id route (get a specific task by ID)
  it("should get a specific task by ID", async () => {
    const response = await request(app).get(`/API/v1/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", true);
    expect(response.body).toHaveProperty("data");
  });

  // Test the PUT /API/v1/tasks/:id route (update a task by ID)
  it("should update a task by ID", async () => {
    const updatedTask = {
      title: "Updated Task",
      description: "This is an updated task.",
      completed: true,
    };

    const response = await request(app)
      .put(`/API/v1/tasks/${taskId}`)
      .send(updatedTask);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", true);
    expect(response.body).toHaveProperty("data");
    const { data } = response.body;
    expect(data).toHaveProperty("title", updatedTask.title);
    expect(data).toHaveProperty("description", updatedTask.description);
    expect(data).toHaveProperty("completed", updatedTask.completed);
  });

  // Test the DELETE /API/v1/tasks/:id route (delete a task by ID)
  it("should delete a task by ID", async () => {
    const response = await request(app).delete(`/API/v1/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", true);
    expect(response.body).toHaveProperty("message", "Item deleted");
  });
});

describe("Error Handling", () => {
  // Test 404 Not Found Error
  it("should return 404 Not Found for an unmatched route", async () => {
    const response = await request(app).get("/nonexistentroute");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: false,
      message: "Route not found",
    });
  });
});
