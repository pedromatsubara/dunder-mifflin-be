const { DatabaseError } = require("../utils/customErrors");
const Department = require("../models/Department");

class DepartmentRepository {
  async findAll() {
    try {
      return await Department.findAll();
    } catch (error) {
      throw new DatabaseError("Error fetching all departments");
    }
  }
}

module.exports = new DepartmentRepository();
