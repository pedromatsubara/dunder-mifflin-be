const express = require("express");
const sequelize = require("./src/config/database");
const errorHandler = require("./src/middlewares/errorHandler");
const employeeRoutes = require("./src/routes/employeeRoutes");
const departmentRoutes = require("./src/routes/departmentRoutes");

const app = express();
app.use(express.json());
sequelize.sync();

app.use("/employees", employeeRoutes);
app.use("/departments", departmentRoutes);

app.use(errorHandler);

module.exports = app;
