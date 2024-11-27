import { Router } from "express";
import * as controller from "../controllers/departmentController";
import { serviceHandler } from "../middlewares/serviceHandler";

const router = Router();

router.get("/", serviceHandler(controller.getDepartments));

export default router;
