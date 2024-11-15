const departmentService = require("../services/departmentService");

exports.getAllDepartments = async (req, res, next) => {
  try {
    const departments = await departmentService.getAllDepartments();
    res.json(departments);
  } catch (error) {
    next(error);
  }
};
