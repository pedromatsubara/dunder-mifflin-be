const sequelize = require("./database");
const Department = require("../models/Department");

async function initializeDepartments() {
  const departments = [
    { name: "Administration" },
    { name: "Accounting" },
    { name: "Human Resources" },
    { name: "Management" },
    { name: "Marketing" },
    { name: "Sales" },
  ];

  for (const dept of departments) {
    await Department.findOrCreate({ where: { name: dept.name } });
  }
  console.log("Departments have been initialized");
}

async function initializeDatabaseMocks() {
  try {
    await sequelize.sync();
    console.log("Database synchronized");

    await initializeDepartments();
  } catch (error) {
    throw error;
  }
}

module.exports = initializeDatabaseMocks;
