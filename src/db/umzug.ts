import connection from './connection';
import { Nail } from '../models/nail.model';
import { CatNail } from '../models/CatNail.model';
import { User } from '../models/user.model';
import { CatUser } from '../models/CatUser.model';

const command = process.argv[2]

// Nail.belongsTo(CatNail);
// CatNail.hasMany(Nail);

// User.belongsTo(CatUser);
// CatUser.hasMany(User);

// connection.getQueryInterface().dropAllTables();


switch(command) {
    case 'create':
        connection.createAllTables();
        break;
    case 'modify':
        connection.modifyTable();
        break;
    default:
        console.log('Flag not given, try with:\n "create" \n "modify"');
}





