require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.SERVER_PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to database
const db = require("./models");

// Synchronize the database with the defined models (create tables if they don't exist)
db.sequelize.sync();

// Force sync the database (use with caution, as it will drop and recreate tables)
// db.sequelize.sync({
//   force: true,
// });

// Routes
require("./routes/taskRoutes")(app);

// Error handling middleware for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ status: false, message: "Route not found" });
});

// Error handling middleware for general errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: false, message: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});

module.exports = app;
