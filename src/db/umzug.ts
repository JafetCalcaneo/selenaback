import { Umzug, SequelizeStorage } from 'umzug';
import connection from './connection';
import { readdirSync } from 'fs';
import { join } from 'path';
import { up, down } from './migrations/genericMigrations';

export const migrator = new Umzug({
    migrations: {
        glob: ['migrations/*.ts', { cwd: __dirname}],
    },
    context: connection,
    storage: new SequelizeStorage({
        sequelize: connection,
    }),
    logger: console,
})


const runMigrations = async () => {
    const modelsDir = (join(__dirname, '../models'));
    const modelFiles = readdirSync((modelsDir));

    for(let file of modelFiles){
        const modelPath = join(modelsDir, file);
        console.log('REQUIRED MODEL: \n', require(modelPath));
        const { modelName, modelStructure } = require(modelPath);

        up(connection, modelName, modelStructure);
    }

};

runMigrations().catch((err) => {
    console.error(err);
    process.exit(1);
});


// const downMi = async () => await down(connection, 'Users');
// downMi();

export type Migration = typeof migrator._types.migration;
