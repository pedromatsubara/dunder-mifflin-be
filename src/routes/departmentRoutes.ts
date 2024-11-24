import { Router } from "express";
import * as departmentController from "../controllers/departmentController";

const departmentRouter = Router();

departmentRouter.get("/", departmentController.getDepartments);

export default departmentRouter;
