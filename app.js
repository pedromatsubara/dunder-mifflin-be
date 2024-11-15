const express = require("express");
const sequelize = require("./src/config/database");
const employeeRoutes = require("./src/routes/employeeRoutes");

const app = express();
app.use(express.json());

sequelize.sync();

app.use("/employees", employeeRoutes);

module.exports = app;
