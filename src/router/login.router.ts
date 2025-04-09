import { Request, Response, Router } from 'express';
import connection from '../db/connection';
import { User } from '@/models/user.model';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {

    console.log(req)
    
    const { name, password } = req.body;
    
    const userFound = await User.findOne( { where: { name: name, password: password } } );

    if(!userFound) {
        res.status(404).json( { message: 'User notFound!' } );
    } else {
        res.status(200).json( userFound );
    }

});



export default router;