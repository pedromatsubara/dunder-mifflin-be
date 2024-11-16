const employeeRepository = require("../repositories/employeeRepository");
const fileService = require("./fileService");
const { NotFoundError } = require("../utils/customErrors");
const departmentHistoryService = require("./departmentHistoryService");

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
    try {
      const employee = await employeeRepository.create(employeeData);

      if (employeeAvatar) {
        const fileName = `employee-${employee.id}.jpg`;
        await fileService.saveImage(employeeAvatar.buffer, fileName);
      }

      return employee;
    } catch (error) {
      throw error;
    }
  }

  async updateEmployee(id, updates) {
    try {
      const employee = await this.getEmployeeById(id);

      // Handle department change if needed
      if (
        updates.departmentId &&
        updates.departmentId !== employee.departmentId
      ) {
        await departmentHistoryService.createDepartmentChange(
          id,
          updates.departmentId
        );
      }

      await employeeRepository.update(id, updates);

      return await this.getEmployeeById(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployee(id) {
    try {
      await departmentHistoryService.deleteHistoryByEmployeeId(id);
      await employeeRepository.delete(id);

      const fileName = `employee-${id}.jpg`;
      await fileService.deleteFile(fileName);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new EmployeeService();
