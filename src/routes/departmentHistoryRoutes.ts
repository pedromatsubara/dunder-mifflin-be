import { Router } from "express";
import * as departmentHistoryController from "../controllers/departmentHistoryController";

const departmentHistoryRouter = Router();

departmentHistoryRouter.get(
  "/:employeeId",
  departmentHistoryController.getDepartmentHistoryByEmployeeId
);

export default departmentHistoryRouter;
