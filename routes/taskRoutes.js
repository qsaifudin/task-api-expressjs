const controller = require("../controllers/taskController");

module.exports = (app) => {
  const router = require("express").Router();

  // Group routes under /api/v1 prefix
  app.use("/API/v1", router);

  router.get("/tasks", controller.getAll); // Get a list of tasks
  router.get("/tasks/:id", controller.getById); // Get a specific task by ID
  router.post("/tasks", controller.create); // Create a new task
  router.put("/tasks/:id", controller.update); // Update a task by ID
  router.delete("/tasks/:id", controller.delete); // Delete a task by ID
};
