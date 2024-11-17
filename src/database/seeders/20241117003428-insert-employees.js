const fs = require("fs/promises");
const path = require("path");
const Employee = require("../models/Employee");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const employees = [
      {
        firstName: "Michael",
        lastName: "Scott",
        hireDate: "1993-09-18T00:00:00",
        phone: "394-379-1563",
        address: "980 Market St, Scranton, Pennsylvania",
        departmentId: 4,
      },
      {
        firstName: "Jim",
        lastName: "Halpert",
        hireDate: "2001-03-26T00:00:00",
        phone: "496-473-6680",
        address: "275 Main St, Scranton, Pennsylvania",
        departmentId: 6,
      },
      {
        firstName: "Pam",
        lastName: "Beesly",
        hireDate: "2003-05-12T00:00:00",
        phone: "990-710-2008",
        address: "982 Scranton Rd, Scranton, Pennsylvania",
        departmentId: 1,
      },
      {
        firstName: "Dwight",
        lastName: "Schrute",
        hireDate: "1999-12-09T00:00:00",
        phone: "578-433-3787",
        address: "183 Main St, Scranton, Pennsylvania",
        departmentId: 6,
      },
      {
        firstName: "Kevin",
        lastName: "Malone",
        hireDate: "2001-10-10T00:00:00",
        phone: "800-684-1963",
        address: "337 Market St, Scranton, Pennsylvania",
        departmentId: 2,
      },
      {
        firstName: "Stanley",
        lastName: "Hudson",
        hireDate: "1987-12-04T00:00:00",
        phone: "225-276-2154",
        address: "717 Scranton Rd, Scranton, Pennsylvania",
        departmentId: 6,
      },
      {
        firstName: "Toby",
        lastName: "Flenderson",
        hireDate: "1996-07-03T00:00:00",
        phone: "840-927-9324",
        address: "589 Willow St, Scranton, Pennsylvania",
        departmentId: 3,
      },
      {
        firstName: "Kelly",
        lastName: "Kapoor",
        hireDate: "2005-07-30T00:00:00",
        phone: "520-193-2935",
        address: "135 Market St, Scranton, Pennsylvania",
        departmentId: 5,
      },
      {
        firstName: "Angela",
        lastName: "Martin",
        hireDate: "2001-04-28T00:00:00",
        phone: "742-830-9366",
        address: "108 Market St, Scranton, Pennsylvania",
        departmentId: 2,
      },
      {
        firstName: "Phyllis",
        lastName: "Lapin",
        hireDate: "1997-11-28T00:00:00",
        phone: "229-329-5715",
        address: "580 Market St, Scranton, Pennsylvania",
        departmentId: 6,
      },
      {
        firstName: "Oscar",
        lastName: "Martinez",
        hireDate: "2001-10-13T00:00:00",
        phone: "786-917-6228",
        address: "889 Scranton Rd, Scranton, Pennsylvania",
        departmentId: 2,
      },
      {
        firstName: "Creed",
        lastName: "Bratton",
        hireDate: "1990-04-21T00:00:00",
        phone: "293-421-8981",
        address: "279 Pine St, Scranton, Pennsylvania",
        departmentId: 1,
      },
      {
        firstName: "Meredith",
        lastName: "Palmer",
        hireDate: "2002-06-29T00:00:00",
        phone: "260-209-8936",
        address: "460 Pine St, Scranton, Pennsylvania",
        departmentId: 1,
      },
    ];

    for (const employee of employees) {
      await Employee.findOrCreate({ where: employee });
    }

    console.log("Employees have been initialized");

    // Employee mock images
    const sourceFolder = path.resolve(
      __dirname,
      "../../../",
      "public/mockImages"
    );
    const targetFolder = path.resolve(__dirname, "../../../", "public/images");

    try {
      // await fs.rm(targetFolder, { recursive: true, force: true });
      await fs.mkdir(targetFolder, { recursive: true });

      const files = await fs.readdir(sourceFolder);

      for (const file of files) {
        const sourceFile = path.join(sourceFolder, file);
        const targetFile = path.join(targetFolder, file);

        await fs.copyFile(sourceFile, targetFile);
      }

      console.log("All images copied successfully.");
    } catch (error) {
      console.error("Error copying images:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Employees", null, {});
  },
};
