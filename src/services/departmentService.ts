import Department from "../database/models/Department";
import { findAllDepartments } from "../repositories/departmentRepository";
import { NotFoundError } from "../utils/customErrors";

export const getAllDepartments = async (): Promise<Department[]> => {
  try {
    const departments = await findAllDepartments();

    if (departments.length === 0) {
      throw new NotFoundError("No departments found");
    }

    return departments;
  } catch (error) {
    throw error;
  }
};
