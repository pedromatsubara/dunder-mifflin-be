const departmentHistoryRepository = require("../repositories/departmentHistoryRepository");
const { NotFoundError } = require("../utils/customErrors");

class DepartmentHistoryService {
  async getDepartmentHistoryById(employeeId) {
    try {
      const history = await departmentHistoryRepository.findAllByEmployeeId(
        employeeId
      );

      if (!history) {
        throw new NotFoundError(
          `No department history found for employee with ID ${employeeId}`
        );
      }

      return history;
    } catch (error) {
      throw error;
    }
  }

  async createDepartmentChange(employeeId, departmentId, transaction) {
    try {
      const historyData = {
        employeeId,
        departmentId,
      };

      return await departmentHistoryRepository.create(historyData, transaction);
    } catch (error) {
      throw error;
    }
  }

  async deleteHistoryByEmployeeId(employeeId, transaction) {
    try {
      return await departmentHistoryRepository.delete(employeeId, transaction);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new DepartmentHistoryService();
