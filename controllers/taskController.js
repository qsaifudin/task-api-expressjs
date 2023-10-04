const db = require("../models");
const Task = db.task;

// Implement other controller methods for create, get by ID, update, delete, etc.
module.exports = {
  getAll: async (req, res) => {
    try {
      const tasks = await Task.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  },
  create: async (req, res) => {
    try {
      // Get task data from the request body
      const { title, description, completed } = req.body;

      // Validate input (ensure required fields are present)
      if (!title || !description) {
        return res
          .status(400)
          .json({ message: "Title and description are required." });
      }

      // Create a new task in the database
      const newTask = await Task.create({
        title,
        description,
        completed: !!completed, // Convert to a boolean
      });

      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  },
};
