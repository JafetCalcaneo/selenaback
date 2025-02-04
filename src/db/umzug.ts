import connection from './connection';
import { Nail } from '../models/nail.model';
import { CatNail } from '../models/catNail.model';

const command = process.argv[2]

Nail.belongsTo(CatNail, {
    foreignKey: 'NailTypeId',
});
CatNail.hasMany(Nail, {
    foreignKey: 'NailTypeId',
});



switch(command) {
    case 'create':
        connection.createAllTables();
        break;
    case 'modify':
        connection.modifyTables();
        break;
    default:
        console.log('Flag not given, try with:\n "create" \n "modify"');
}





