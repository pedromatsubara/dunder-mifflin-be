import { Router } from "express";
import * as controller from "../controllers/departmentHistoryController";
import { serviceHandler } from "../middlewares/serviceHandler";

const router = Router();

router.get("/:employeeId", serviceHandler(controller.getDepartmentHistoryByEmployeeId));

export default router;
