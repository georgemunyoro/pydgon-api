import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { sequelize } from '../database';

export const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contact: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});
