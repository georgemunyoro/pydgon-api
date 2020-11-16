import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING;

export const sequelize = new Sequelize(connectionString!, {
  logging: false,
});
