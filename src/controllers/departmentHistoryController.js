const departmentHistoryService = require("../services/departmentHistoryService");

exports.getDepartmentHistoryByEmployeeId = async (req, res, next) => {
  try {
    const history = await departmentHistoryService.getDepartmentHistoryById(
      req.params.employeeId
    );
    res.json(history);
  } catch (error) {
    next(error);
  }
};
