import { Request, Response, NextFunction } from "express";
import { getAllDepartments } from "../services/departmentService";

export const getDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const departments = await getAllDepartments();
    res.json(departments);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
