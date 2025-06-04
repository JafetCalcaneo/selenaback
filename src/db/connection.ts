import { modelStructure } from './../models/user.model';
import { Sequelize } from 'sequelize';
import { readdirSync } from 'fs';
import { join } from 'path';
import 'dotenv/config';

class Connection extends Sequelize {

    private static _instance: Connection;



    private constructor() {
        super(process.env.DATABASE_URL!);
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
    
    public async connect() {
        try {
            await this.authenticate();
        } catch(error) {
            console.log('Error en la conexion\n', error);
        }
    }

    public async disconnect() {
        try {
            await this.close();
        } catch(error) {
            console.log('Error en la desconexion\n', error);
        }
    }

    public async createAllTables() {
            this.dbModels.forEach( async (model: any) => {
                await this.getQueryInterface().createTable(model.modelName, {...model.modelStructure});
            })
    }

    public async modifyTable() {
        this.dbModels.forEach(async (model: any, i: number) => {
            const keys = Object.keys(model.modelStructure)
            const values: any[] = Object.values(model.modelStructure)

            // console.log(values[0].type)
            // console.log(Object.values(model.modelStructure))
            // await this.getQueryInterface().addColumn(model.modelName, values[i].type)
        });
    }

    private get dbModels (): any[] {
        const modelsDir = (join(__dirname, '../models'));
        const modelFiles = readdirSync((modelsDir));
        let models = [];

        for(let file of modelFiles){
            const modelPath = join(modelsDir, file);
            const { modelName, modelStructure } = require(modelPath);
            models.push({modelName, modelStructure});
        }
        return models;
    }

}



export default Connection.instance;
