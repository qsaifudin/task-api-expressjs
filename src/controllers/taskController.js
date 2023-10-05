const db = require("../models");
const Task = db.task;
const { Op } = require("sequelize");

module.exports = {
  getAll: async (req, res) => {
    try {
      // Parse query parameters for pagination, sorting, and filtering
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const sortBy = req.query.sortBy || "createdAt";
      const sortOrder = req.query.sortOrder || "asc";
      const titleFilter = req.query.title || null;

      // Calculate the offset based on the page and pageSize
      const offset = (page - 1) * pageSize;

      // Build sorting order based on query parameters
      const order = [[sortBy, sortOrder]];

      // Build filter conditions based on query parameters
      const where = {};
      if (titleFilter) {
        where.title = { [Op.like]: `%${titleFilter}%` };
      }

      // Query tasks with pagination, sorting, and filtering
      const tasks = await Task.findAndCountAll({
        where,
        offset,
        limit: pageSize,
        order,
      });

      // Calculate total pages based on the count and pageSize
      const totalPages = Math.ceil(tasks.count / pageSize);

      // Response with pagination metadata
      const response = {
        status: true,
        data: tasks.rows,
        pagination: {
          page,
          pageSize,
          totalItems: tasks.count,
          totalPages,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Something went wrong!" });
    }
  },

  create: async (req, res) => {
    try {
      // Get task data from the request body
      const { title, description, completed } = req.body;

      // Validate input
      if (!title || !description) {
        return res.status(400).json({
          status: false,
          message: "Title and description are required.",
        });
      }

      // Create
      const newTask = await Task.create({
        title,
        description,
        completed: !!completed, // Convert to a boolean
      });

      res.status(200).json({ status: true, data: newTask });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Something went wrong!" });
    }
  },

  getById: async (req, res) => {
    const taskId = req.params.id;
    try {
      // Find the task by ID
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res
          .status(404)
          .json({ status: false, message: "Task not found." });
      }
      res.status(200).json({ status: true, data: task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Something went wrong!" });
    }
  },

  update: async (req, res) => {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;

    try {
      // Find the task by ID
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res
          .status(404)
          .json({ status: false, message: "Task not found." });
      }

      // Validate
      if (!title || !description) {
        return res.status(400).json({
          status: false,
          message: "Title and description are required.",
        });
      }

      task.title = title || task.title;
      task.description = description || task.description;
      task.completed = completed || task.completed;

      // Save the updated task
      await task.save();

      res.status(200).json({ status: true, data: task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Something went wrong!" });
    }
  },

  delete: async (req, res) => {
    const taskId = req.params.id;
    try {
      // Find the task by ID
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res
          .status(404)
          .json({ status: false, message: "Task not found." });
      }

      // Delete the task
      await task.destroy();

      res.status(200).json({ status: true, message: "Item deleted" }); // No content, successful deletion
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Something went wrong!" });
    }
  },
};
