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

db.sequelize.sync();
// db.sequelize.sync({
//   force: true,
// });

// Routes
// const taskRoutes = require('./routes/taskRoutes');
require("./routes/taskRoutes")(app);
// app.use('/api/v1', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
