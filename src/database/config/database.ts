import "dotenv/config";
import { Options } from "sequelize";

const config: Options = {
  host: "127.0.0.1",
  dialect: "sqlite",
  storage: process.env.DB_PATH,
};

export = config;
