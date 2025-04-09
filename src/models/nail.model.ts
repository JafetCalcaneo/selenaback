import { DataTypes } from 'sequelize';
import connection from '../db/connection';
import { CatNail } from './CatNail.model';

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
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nailType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CatNail,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'

    }
});

export const modelStructure = Nail.rawAttributes;
export const modelName = Nail.getTableName();