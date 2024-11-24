import { Request, Response, NextFunction } from "express";
import * as departmentHistoryService from "../services/departmentHistoryService";
import { validateId } from "../utils/validation";
import { serviceHandler } from "../middlewares/serviceHandler";

export const getDepartmentHistoryByEmployeeId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await serviceHandler(
    () => {
      const employeeId = validateId(req.params.employeeId);
      return departmentHistoryService.getDepartmentHistoryById(employeeId);
    },
    res,
    next
  );
};
