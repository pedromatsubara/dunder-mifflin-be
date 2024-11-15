const Employee = require("../models/Employee");
const { DatabaseError } = require("../utils/customErrors");

class EmployeeRepository {
  async findAll() {
    try {
      return await Employee.findAll();
    } catch (error) {
      throw new DatabaseError("Failed to fetch employees", error);
    }
  }

  async findById(id) {
    try {
      return await Employee.findByPk(id);
    } catch (error) {
      throw new DatabaseError("Failed to fetch employee by ID", error);
    }
  }

  async create(employeeData) {
    try {
      return await Employee.create(employeeData);
    } catch (error) {
      throw new DatabaseError("Failed to create employee", error);
    }
  }

  async update(id, employeeData) {
    try {
      await Employee.update(employeeData, { where: { id } });
    } catch (error) {
      throw new DatabaseError("Failed to update employee", error);
    }
  }

  async delete(id) {
    try {
      await Employee.destroy({ where: { id } });
    } catch (error) {
      throw new DatabaseError("Failed to delete employee", error);
    }
  }
}

module.exports = new EmployeeRepository();
