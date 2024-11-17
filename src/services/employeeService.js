const sequelize = require("../database/config/database");
const employeeRepository = require("../repositories/employeeRepository");
const departmentHistoryService = require("./departmentHistoryService");
const fileService = require("./fileService");
const { NotFoundError } = require("../utils/customErrors");

class EmployeeService {
  async getAllEmployees() {
    try {
      return await employeeRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getEmployeeById(id) {
    try {
      const employee = await employeeRepository.findById(id);

      if (!employee) {
        throw new NotFoundError(`Employee with ID ${id} not found`);
      }

      return employee;
    } catch (error) {
      throw error;
    }
  }

  async createEmployee(employeeData, employeeAvatar) {
    const transaction = await sequelize.transaction();

    try {
      const employee = await employeeRepository.create(
        employeeData,
        transaction
      );

      await departmentHistoryService.createDepartmentChange(
        employee.id,
        employeeData.departmentId,
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
  }

  async updateEmployee(id, updates) {
    const transaction = await sequelize.transaction();

    try {
      const employee = await this.getEmployeeById(id);

      // Handle department change if needed
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

      return await this.getEmployeeById(id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async deleteEmployee(id) {
    const transaction = await sequelize.transaction();

    try {
      await departmentHistoryService.deleteHistoryByEmployeeId(id, transaction);
      await employeeRepository.delete(id, transaction);
      await transaction.commit();

      const fileName = `employee-${id}.jpg`;
      await fileService.deleteFile(fileName);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new EmployeeService();
