import { Sequelize, DataTypes } from "sequelize";
import connection from "../db/connection";
import { CatUser } from "./CatUser.model";

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
    userType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CatUser,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export const modelStructure = User.rawAttributes;
export const modelName = User.getTableName();