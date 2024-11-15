const employeeRepository = require("../repositories/employeeRepository");

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

      return employee;
    } catch (error) {
      throw error;
    }
  }

  async createEmployee(employeeData) {
    try {
      const employee = await employeeRepository.create(employeeData);

      return employee;
    } catch (error) {
      throw error;
    }
  }

  async updateEmployee(id, updates) {
    try {
      const employee = await this.getEmployeeById(id);

      await employeeRepository.update(id, updates);

      return employee;
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployee(id) {
    try {
      await employeeRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new EmployeeService();
