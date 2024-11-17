const express = require("express");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./src/middlewares/errorHandler");
const employeeRoutes = require("./src/routes/employeeRoutes");
const departmentRoutes = require("./src/routes/departmentRoutes");
const departmentHistoryRoutes = require("./src/routes/departmentHistoryRoutes");
const initializeDatabaseMocks = require("./src/database/mocks/databaseInitializer");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/employees", employeeRoutes);
app.use("/departments", departmentRoutes);
app.use("/department-history", departmentHistoryRoutes);

app.use(errorHandler);

initializeDatabaseMocks().catch((error) => {
  console.error("Error during database initialization:", error);
});

module.exports = app;
