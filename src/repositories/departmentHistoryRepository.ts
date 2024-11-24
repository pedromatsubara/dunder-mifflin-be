import { Transaction } from "sequelize";
import { DatabaseError } from "../utils/customErrors";
import DepartmentHistory from "../database/models/DepartmentHistory";
import Department from "../database/models/Department";

export const findAllByEmployeeId = async (
  employeeId: number
): Promise<DepartmentHistory[]> => {
  try {
    return await DepartmentHistory.findAll({
      where: { employeeId },
      order: [["id", "desc"]],
      include: [{ model: Department, attributes: ["name"] }],
    });
  } catch (error) {
    throw new DatabaseError(
      `Error fetching department history for employee ID ${employeeId}`
    );
  }
};

export const create = async (
  historyData: Partial<DepartmentHistory>,
  transaction: Transaction
): Promise<DepartmentHistory> => {
  try {
    return await DepartmentHistory.create(historyData, { transaction });
  } catch (error) {
    throw new DatabaseError("Error creating department history entry");
  }
};

export const deleteByEmployeeId = async (
  employeeId: number,
  transaction: Transaction
): Promise<void> => {
  try {
    await DepartmentHistory.destroy({
      where: { employeeId },
      transaction,
    });
  } catch (error) {
    throw new DatabaseError(
      `Error deleting department history for employee ID ${employeeId}`
    );
  }
};
