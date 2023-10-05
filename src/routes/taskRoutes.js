const controller = require("../controllers/taskController");

module.exports = (app) => {
  // const router = require("express").Router();

  app.get("/", (req, res) => {
    res.send("Saifudin Task API ExpressJS");
  });

  // Group routes under /api/v1 prefix
  // Get a list of tasks
  // app.use("/API/v1", app);

  app.get("/API/v1/tasks", controller.getAll); // Get a list of tasks
  app.get("/API/v1/tasks/:id", controller.getById); // Get a specific task by ID
  app.post("/API/v1/tasks", controller.create); // Create a new task
  app.put("/API/v1/tasks/:id", controller.update); // Update a task by ID
  app.delete("/API/v1/tasks/:id", controller.delete); // Delete a task by ID
};
