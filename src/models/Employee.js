const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define("Employee", {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  hireDate: { type: DataTypes.DATE, allowNull: true },
  active: { type: DataTypes.BOOLEAN, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.STRING, allowNull: true },
  departmentId: { type: DataTypes.INTEGER, allowNull: true },
});

module.exports = Employee;
