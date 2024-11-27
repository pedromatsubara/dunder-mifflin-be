import { Request } from "express";
import * as employeeService from "../services/employeeService";
import { validateId } from "../utils/validation";
import Employee from "../database/models/Employee";

export const getAllEmployees = async (req: Request): Promise<Employee[]> => {
  return await employeeService.getAllEmployees();
};

export const getEmployeeById = async (req: Request): Promise<Employee> => {
  const employeeId = validateId(req.params.id);
  return employeeService.getEmployeeById(employeeId);
};

export const createEmployee = async (req: Request): Promise<Employee> => {
  return employeeService.createEmployee(req.body, req.file);
};

export const updateEmployee = async (req: Request): Promise<Employee> => {
  const employeeId = validateId(req.params.id);
  return employeeService.updateEmployee(employeeId, req.body);
};

export const deleteEmployee = async (req: Request): Promise<void> => {
  const employeeId = validateId(req.params.id);
  return employeeService.deleteEmployee(employeeId);
};
