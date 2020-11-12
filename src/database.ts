import { Sequelize } from "sequelize";
import { database } from "../config/config.json";

export const sequelize = new Sequelize(database.connectionString);
