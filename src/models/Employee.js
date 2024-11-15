const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Department = require("./Department");

const Employee = sequelize.define("Employee", {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  hireDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
  phone: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.STRING, allowNull: true },
  departmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Department,
      key: "id",
    },
    allowNull: true,
  },
});

Employee.belongsTo(Department, { foreignKey: "departmentId" });

module.exports = Employee;
