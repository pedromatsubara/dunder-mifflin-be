const { DatabaseError } = require("../utils/customErrors");
const DepartmentHistory = require("../database/models/DepartmentHistory");
const Department = require("../database/models/Department");

class DepartmentHistoryRepository {
  async findAllByEmployeeId(employeeId) {
    try {
      return await DepartmentHistory.findAll({
        where: { employeeId },
        order: [["id", "desc"]],
        include: [{ model: Department, attributes: ["name"] }],
      });
    } catch (error) {
      throw new DatabaseError(
        `Error fetching department history for employee ID ${employeeId}`
      );
    }
  }

  async create(historyData, transaction) {
    try {
      return await DepartmentHistory.create(historyData, { transaction });
    } catch (error) {
      throw new DatabaseError("Error creating department history entry");
    }
  }

  async delete(employeeId, transaction) {
    try {
      await DepartmentHistory.destroy({
        where: { employeeId },
        transaction,
      });
    } catch (error) {
      throw new DatabaseError(
        `Error deleting department history for employee ID ${employeeId}`
      );
    }
  }
}

module.exports = new DepartmentHistoryRepository();
