const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Employee = require("./Employee");
const Department = require("./Department");

const DepartmentHistory = sequelize.define("DepartmentHistory", {
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: "id",
    },
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Department,
      key: "id",
    },
    allowNull: false,
  },
});

DepartmentHistory.belongsTo(Employee, {
  foreignKey: "employeeId",
});
DepartmentHistory.belongsTo(Department, {
  foreignKey: "departmentId",
});

module.exports = DepartmentHistory;
