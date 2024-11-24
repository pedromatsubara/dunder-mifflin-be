import sequelize, { Model } from "sequelize";
import db from ".";
import Department from "./Department";

class Employee extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare hireDate: string;
  declare active: boolean;
  declare phone: string;
  declare address: string;
  declare departmentId: number;
}

Employee.init(
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: sequelize.STRING,
      allowNull: false,
    },
    hireDate: {
      type: sequelize.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW,
    },
    active: {
      type: sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    phone: {
      type: sequelize.STRING,
      allowNull: true,
    },
    address: {
      type: sequelize.STRING,
      allowNull: true,
    },
    departmentId: {
      type: sequelize.INTEGER,
      references: {
        model: "Departments",
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "Employees",
  }
);

Employee.belongsTo(Department, { foreignKey: "departmentId" });

export default Employee;
