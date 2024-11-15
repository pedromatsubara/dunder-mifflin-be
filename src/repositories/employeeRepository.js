const Employee = require("../models/Employee");

class EmployeeRepository {
  async findAll() {
    try {
      return await Employee.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      return await Employee.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  async create(employeeData) {
    try {
      return await Employee.create(employeeData);
    } catch (error) {
      throw error;
    }
  }

  async update(id, employeeData) {
    try {
      await Employee.update(employeeData, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      await Employee.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new EmployeeRepository();
