import { Transaction } from "sequelize";
import * as departmentHistoryRepository from "../repositories/departmentHistoryRepository";
import { NotFoundError } from "../utils/customErrors";
import DepartmentHistory from "../database/models/DepartmentHistory";

export const getDepartmentHistoryById = async (
  employeeId: number
): Promise<DepartmentHistory[]> => {
  const history = await departmentHistoryRepository.findAllByEmployeeId(
    employeeId
  );

  if (!history || history.length === 0) {
    throw new NotFoundError(
      `No department history found for employee with ID ${employeeId}`
    );
  }

  return history;
};

export const createDepartmentChange = async (
  employeeId: number,
  departmentId: number,
  transaction: Transaction
): Promise<DepartmentHistory> => {
  const historyData = {
    employeeId,
    departmentId,
  } as DepartmentHistory;

  return await departmentHistoryRepository.create(historyData, transaction);
};

export const deleteHistoryByEmployeeId = async (
  employeeId: number,
  transaction: Transaction
): Promise<void> => {
  await departmentHistoryRepository.deleteByEmployeeId(employeeId, transaction);
};
