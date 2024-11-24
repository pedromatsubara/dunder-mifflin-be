import { Request, Response, NextFunction } from "express";
import { getAllDepartments } from "../services/departmentService";
import { serviceHandler } from "../middlewares/serviceHandler";

export const getDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await serviceHandler(getAllDepartments, res, next);
};
