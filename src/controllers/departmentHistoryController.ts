import { Request } from "express";
import * as departmentHistoryService from "../services/departmentHistoryService";
import { validateId } from "../utils/validation";
import DepartmentHistory from "../database/models/DepartmentHistory";

export const getDepartmentHistoryByEmployeeId = async (req: Request): Promise<DepartmentHistory[]> => {
  const employeeId = validateId(req.params.employeeId);
  return departmentHistoryService.getDepartmentHistoryById(employeeId);
};
