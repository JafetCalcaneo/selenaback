import { DataTypes, Sequelize } from 'sequelize';
import type { Migration } from '../umzug';
import connection from '../connection';

export const up = async (sequelize: Sequelize, modelName: string, modelStructure: any) => {
    console.log(`Sequelize: ====>> ${sequelize}, Type: ${typeof sequelize}`);
    console.log(`modelName: ====>> ${modelName}, Type: ${typeof modelName}`);
    console.log(`modelStructure: ====>> ${modelStructure}, Type: ${typeof modelStructure}\n`);
    await sequelize.getQueryInterface().createTable(modelName, {...modelStructure});
}

export const down = async (sequelize: Sequelize, modelName: string) => {
    await sequelize.getQueryInterface().dropTable(modelName);
}