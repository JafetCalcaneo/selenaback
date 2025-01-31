import { Sequelize, DataTypes } from "sequelize";
import connection from "../db/connection";

export const User = connection.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export const modelStructure = User.rawAttributes;
export const modelName = User.getTableName();