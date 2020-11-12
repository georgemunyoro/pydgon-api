import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { sequelize } from '../database';

export const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  sender: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  recepient: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});
