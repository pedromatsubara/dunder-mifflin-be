const Department = require("../models/Department");
const Employee = require("../models/Employee");
const { DatabaseError } = require("../utils/customErrors");

class EmployeeRepository {
  async findAll() {
    try {
      return await Employee.findAll({
        attributes: ["id", "firstName", "lastName", "hireDate"],
        include: { model: Department, attributes: ["name"] },
      });
    } catch (error) {
      throw new DatabaseError("Failed to fetch employees", error);
    }
  }

  async findById(id) {
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
      throw new DatabaseError("Failed to fetch employee by ID", error);
    }
  }

  async create(employeeData, transaction) {
    try {
      return await Employee.create(employeeData, { transaction });
    } catch (error) {
      throw new DatabaseError("Failed to create employee", error);
    }
  }

  async update(id, employeeData, transaction) {
    try {
      await Employee.update(employeeData, {
        where: { id },
        transaction,
      });
    } catch (error) {
      throw new DatabaseError("Failed to update employee", error);
    }
  }

  async delete(id, transaction) {
    try {
      await Employee.destroy({
        where: { id },
        transaction,
      });
    } catch (error) {
      throw new DatabaseError("Failed to delete employee", error);
    }
  }
}

module.exports = new EmployeeRepository();
