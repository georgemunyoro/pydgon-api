import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../database";

export const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    contact: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
