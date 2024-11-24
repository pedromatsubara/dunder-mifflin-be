import Department from "../database/models/Department";
import { DatabaseError } from "../utils/customErrors";

export const findAllDepartments = async (): Promise<Department[]> => {
  try {
    return await Department.findAll();
  } catch (error) {
    throw new DatabaseError("Error fetching all departments");
  }
};
