import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import { validateId } from "../utils/validation";

export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employeeId = validateId(req.params.id);
    const employee = await employeeService.getEmployeeById(employeeId);
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employee = await employeeService.createEmployee(req.body, req.file);
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employeeId = validateId(req.params.id);
    const employee = await employeeService.updateEmployee(employeeId, req.body);
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employeeId = validateId(req.params.id);
    await employeeService.deleteEmployee(employeeId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
