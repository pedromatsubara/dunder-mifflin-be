module.exports = {
  up: async (queryInterface, Sequelize) => {
    const departmentHistory = [
      {
        employeeId: 1,
        departmentId: 4,
        date: "1993-09-18T00:00:00",
      },
      {
        employeeId: 2,
        departmentId: 6,
        date: "2001-03-26T00:00:00",
      },
      {
        employeeId: 3,
        departmentId: 4,
        date: "2003-05-12T00:00:00",
      },
      {
        employeeId: 4,
        departmentId: 4,
        date: "1999-12-09T00:00:00",
      },
      {
        employeeId: 5,
        departmentId: 4,
        date: "2001-10-10T00:00:00",
      },
      {
        employeeId: 6,
        departmentId: 4,
        date: "1987-12-04T00:00:00",
      },
      {
        employeeId: 7,
        departmentId: 4,
        date: "1996-07-03T00:00:00",
      },
      {
        employeeId: 8,
        departmentId: 4,
        date: "2005-07-30T00:00:00",
      },
      {
        employeeId: 9,
        departmentId: 4,
        date: "2001-04-28T00:00:00",
      },
      {
        employeeId: 10,
        departmentId: 4,
        date: "1997-11-28T00:00:00",
      },
      {
        employeeId: 11,
        departmentId: 4,
        date: "2001-10-13T00:00:00",
      },
      {
        employeeId: 12,
        departmentId: 4,
        date: "1990-04-21T00:00:00",
      },
      {
        employeeId: 13,
        departmentId: 4,
        date: "2002-06-29T00:00:00",
      },
    ];

    for (const history of departmentHistory) {
      const existingHistory = await queryInterface.rawSelect(
        "DepartmentHistory",
        {
          where: {
            employeeId: history.employeeId,
            departmentId: history.departmentId,
          },
        },
        ["id"]
      );
      if (!existingHistory) {
        await queryInterface.bulkInsert("DepartmentHistory", [
          {
            ...history,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      }
    }
    console.log("Departments History have been initialized");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("DepartmentHistory", null, {});
  },
};
