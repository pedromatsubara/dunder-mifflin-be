import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import { validateId } from "../utils/validation";
import { serviceHandler } from "../middlewares/serviceHandler";

export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await serviceHandler(employeeService.getAllEmployees, res, next);
};

export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await serviceHandler(
    () => {
      const employeeId = validateId(req.params.id);
      return employeeService.getEmployeeById(employeeId);
    },
    res,
    next
  );
};

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await serviceHandler(
    () => employeeService.createEmployee(req.body, req.file),
    res,
    next,
    201
  );
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await serviceHandler(
    () => {
      const employeeId = validateId(req.params.id);
      return employeeService.updateEmployee(employeeId, req.body);
    },
    res,
    next
  );
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await serviceHandler(
    () => {
      const employeeId = validateId(req.params.id);
      return employeeService.deleteEmployee(employeeId);
    },
    res,
    next,
    204
  );
};
