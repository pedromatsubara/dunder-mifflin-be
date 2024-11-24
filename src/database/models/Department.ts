import sequelize, { Model } from "sequelize";
import db from ".";

class Department extends Model {
  declare id: number;
  declare name: string;
}
Department.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    tableName: "Departments",
  }
);

export default Department;
