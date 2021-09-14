import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const databaseConnectionString = process.env.DB_CONNECTION_STRING;

export const sequelize = new Sequelize(databaseConnectionString!, {
  logging: false,
});
