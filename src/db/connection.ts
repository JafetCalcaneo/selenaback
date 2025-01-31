import { Sequelize } from 'sequelize';

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


}



export default Connection.instance;