import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../database";

export const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    embededMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    embededFile: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);
