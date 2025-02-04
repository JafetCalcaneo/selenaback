import { DataTypes} from "sequelize";
import connection from "../db/connection";

export const CatNail = connection.define('CatNail', {
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

export const modelStructure = CatNail.rawAttributes;
export const modelName = CatNail.getTableName();