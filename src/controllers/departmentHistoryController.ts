import { Request, Response, NextFunction } from "express";
import * as departmentHistoryService from "../services/departmentHistoryService";
import { validateId } from "../utils/validation";

export const getDepartmentHistoryByEmployeeId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employeeId = validateId(req.params.employeeId);
    const history = await departmentHistoryService.getDepartmentHistoryById(
      employeeId
    );
    res.json(history);
  } catch (error) {
    next(error);
  }
};
