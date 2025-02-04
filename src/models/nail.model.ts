import { DataTypes } from 'sequelize';
import connection from '../db/connection';
import { CatNail } from './catNail.model';

export const Nail = connection.define('Nail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CatNail,
            key: 'id'
        }
    }
});

export const modelStructure = Nail.rawAttributes;
export const modelName = Nail.getTableName();