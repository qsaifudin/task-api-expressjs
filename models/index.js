const { Sequelize } = require("sequelize-cockroachdb");
const { QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.PGHOST, {
  operatorsAliases: 0,
  logging: 0,
  define: {
    freezeTableName: 1,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    useUTC: false,
  },
  timezone: "+07:00",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.QueryTypes = QueryTypes;

// Import and attach the Task model to the db object
db.task = require("../models/Task")(sequelize, Sequelize);

module.exports = db;
