import { Router } from "express";
import { getDepartments } from "../controllers/departmentController";

const departmentRouter = Router();

departmentRouter.get("/departments", getDepartments);

export default departmentRouter;
