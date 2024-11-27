import { Request } from "express";
import { getAllDepartments } from "../services/departmentService";
import Department from "../database/models/Department";

export const getDepartments = async (req: Request): Promise<Department[]> => {
  return getAllDepartments();
};
