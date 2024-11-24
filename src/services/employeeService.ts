import sequelize from "../database/models";
import * as employeeRepository from "../repositories/employeeRepository";
import * as departmentHistoryService from "./departmentHistoryService";
import * as fileService from "./fileService";
import { NotFoundError } from "../utils/customErrors";
import { Transaction } from "sequelize";
import Employee from "../database/models/Employee";

export const getAllEmployees = async (): Promise<Employee[]> => {
  return await employeeRepository.findAll();
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const employee = await employeeRepository.findById(id);

  if (!employee) {
    throw new NotFoundError(`Employee with ID ${id} not found`);
  }

  return employee;
};

export const createEmployee = async (
  employeeData: Partial<Employee>,
  employeeAvatar?: Express.Multer.File
): Promise<Employee> => {
  const transaction: Transaction = await sequelize.transaction();

  try {
    const employee = await employeeRepository.create(employeeData, transaction);

    await departmentHistoryService.createDepartmentChange(
      employee.id,
      employeeData.departmentId!,
      transaction
    );

    if (employeeAvatar) {
      const fileName = `employee-${employee.id}.jpg`;
      await fileService.saveImage(employeeAvatar.buffer, fileName);
    }

    await transaction.commit();
    return employee;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const updateEmployee = async (
  id: number,
  updates: Partial<Employee>
): Promise<Employee> => {
  const transaction: Transaction = await sequelize.transaction();

  try {
    const employee = await getEmployeeById(id);

    if (
      updates.departmentId &&
      updates.departmentId !== employee.departmentId
    ) {
      await departmentHistoryService.createDepartmentChange(
        id,
        updates.departmentId,
        transaction
      );
    }

    await employeeRepository.update(id, updates, transaction);

    await transaction.commit();
    return await getEmployeeById(id);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
export const deleteEmployee = async (id: number): Promise<void> => {
  const transaction: Transaction = await sequelize.transaction();

  try {
    await departmentHistoryService.deleteHistoryByEmployeeId(id, transaction);

    await employeeRepository.deleteEmployee(id, transaction);

    const fileName = `employee-${id}.jpg`;
    await fileService.deleteImage(fileName);

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
