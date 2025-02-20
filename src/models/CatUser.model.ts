import { DataTypes } from 'sequelize';
import connection from '../db/connection';

export const CatUser = connection.define('CatUser', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export const modelStructure = CatUser.rawAttributes;
export const modelName = CatUser.getTableName();