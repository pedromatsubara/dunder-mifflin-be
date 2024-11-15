const departmentRepository = require("../repositories/departmentRepository");

class DepartmentService {
  async getAllDepartments() {
    try {
      return await departmentRepository.findAll();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new DepartmentService();
