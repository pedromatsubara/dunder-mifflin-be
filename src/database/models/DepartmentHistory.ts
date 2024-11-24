import sequelize, { Model } from "sequelize";
import db from ".";
import Employee from "./Employee";
import Department from "./Department";

class DepartmentHistory extends Model {
  declare id: number;
  declare date: string;
  declare employeeId: number;
  declare departmentId: number;
}

DepartmentHistory.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
    employeeId: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Employees",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    departmentId: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Departments",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: db,
    tableName: "DepartmentHistory",
  }
);

DepartmentHistory.belongsTo(Employee, {
  foreignKey: "employeeId",
});
DepartmentHistory.belongsTo(Department, {
  foreignKey: "departmentId",
});

export default DepartmentHistory;
