import { Transaction } from "sequelize";
import Department from "../database/models/Department";
import Employee from "../database/models/Employee";
import { DatabaseError } from "../utils/customErrors";

export const findAll = async (): Promise<Employee[]> => {
  try {
    return await Employee.findAll({
      attributes: ["id", "firstName", "lastName", "hireDate", "active"],
      include: { model: Department, attributes: ["name"] },
    });
  } catch (error) {
    throw new DatabaseError("Failed to fetch employees");
  }
};

export const findById = async (id: number): Promise<Employee | null> => {
  try {
    return await Employee.findByPk(id, {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "active",
        "hireDate",
        "phone",
        "address",
        "departmentId",
      ],
      include: {
        model: Department,
        attributes: ["name"],
      },
    });
  } catch (error) {
    throw new DatabaseError("Failed to fetch employee by ID");
  }
};

export const create = async (
  employeeData: Partial<Employee>,
  transaction?: Transaction
): Promise<Employee> => {
  try {
    return await Employee.create(employeeData, { transaction });
  } catch (error) {
    throw new DatabaseError("Failed to create employee");
  }
};

export const update = async (
  id: number,
  employeeData: Partial<Employee>,
  transaction?: Transaction
): Promise<void> => {
  try {
    await Employee.update(employeeData, {
      where: { id },
      transaction,
    });
  } catch (error) {
    throw new DatabaseError("Failed to update employee");
  }
};

export const deleteEmployee = async (
  id: number,
  transaction?: Transaction
): Promise<void> => {
  try {
    await Employee.destroy({
      where: { id },
      transaction,
    });
  } catch (error) {
    throw new DatabaseError("Failed to delete employee");
  }
};
