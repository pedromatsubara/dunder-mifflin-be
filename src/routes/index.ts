import { Router } from "express";
import departmentRouter from "./departmentRoutes";

// const path = require("path");
// const errorHandler = require("./middlewares/errorHandler");
// const employeeRoutes = require("./routes/employeeRoutes");
// const departmentHistoryRoutes = require("./routes/departmentHistoryRoutes");

const router = Router();

// app.use("/images", express.static(path.join(__dirname, "public/images")));
router.use(departmentRouter);
// app.use("/employees", employeeRoutes);
// app.use("/department-history", departmentHistoryRoutes);

// app.use(errorHandler);

export default router;
