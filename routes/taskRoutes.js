const controller = require("../controllers/taskController");

module.exports = (app) => {
  const router = require("express").Router();

  // Group routes under /api/v1 prefix
  app.use("/API/v1", router);

  // Routes under /api/v1
  router.get("/tasks", controller.getAll);
  router.post("/tasks", controller.create);
  // router.get("/tasks/:id", controller.getById);
  // router.put("/tasks/:id", controller.update);
  // router.delete("/tasks/:id", controller.delete);
};
