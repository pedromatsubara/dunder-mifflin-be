require("dotenv").config();

module.exports = {
  development: {
    host: "127.0.0.1",
    dialect: "sqlite",
    storage: process.env.DB_PATH,
    migrationStorage: "sequelize",
    migrationStorageTableName: "sequelize_meta",
    migrations: {
      path: "./src/database/migrations",
    },
    models: {
      path: "./src/database/models",
    },
  },
  test: {
    dialect: "sqlite",
    storage: process.env.DB_PATH,
  },
  production: {
    dialect: "sqlite",
    storage: process.env.DB_PATH,
  },
};
