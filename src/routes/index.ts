import express from "express";
import path from "path";
import departmentRouter from "./departmentRoutes";
import employeeRouter from "./employeeRoutes";
import departmentHistoryRouter from "./departmentHistoryRoutes";
import errorHandler from "../middlewares/errorHandler";

const router = express.Router();

router.use(
  "/images",
  express.static(path.join(__dirname, "../../public/images"))
);
router.use("/departments", departmentRouter);
router.use("/employees", employeeRouter);
router.use("/department-history", departmentHistoryRouter);

router.use(errorHandler);

export default router;
