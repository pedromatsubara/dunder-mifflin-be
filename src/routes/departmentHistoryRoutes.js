const express = require("express");
const departmentHistoryController = require("../controllers/departmentHistoryController");
const router = express.Router();

router.get(
  "/:employeeId",
  departmentHistoryController.getDepartmentHistoryByEmployeeId
);

module.exports = router;
