import { Sequelize } from 'sequelize';
import { readdirSync } from 'fs';
import { join } from 'path';

class Connection extends Sequelize {

    private static _instance: Connection;



    private constructor() {
        super('postgres://postgres:1234@localhost:5432/selenadb');
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
    
    public async connect() {
        try {
            await this.authenticate();
            console.log('Conexion exitosa');
        } catch(error) {
            console.log('Error en la conexion\n', error);
        }
    }

    public async disconnect() {
        try {
            await this.close();
            console.log('Desconexion exitosa');
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
        this.dbModels.forEach(async (model: any) => {
            console.log(Object.keys(model.modelStructure))
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
