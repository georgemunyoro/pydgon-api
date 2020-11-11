import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.json';

export const sequelize = new Sequelize(databaseConfig.connectionString);
