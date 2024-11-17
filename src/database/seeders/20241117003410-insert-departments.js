module.exports = {
  up: async (queryInterface, Sequelize) => {
    const departments = [
      { name: "Administration" },
      { name: "Accounting" },
      { name: "Human Resources" },
      { name: "Management" },
      { name: "Marketing" },
      { name: "Sales" },
    ];

    for (const dept of departments) {
      const existingDept = await queryInterface.rawSelect(
        "Departments",
        {
          where: { name: dept.name },
        },
        ["id"]
      );
      if (!existingDept) {
        await queryInterface.bulkInsert("Departments", [
          {
            name: dept.name,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      }
    }

    console.log("Departments have been initialized");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Departments", null, {});
  },
};
