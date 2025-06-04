import { Request, Response, Router } from 'express';
import connection from '../db/connection';

const router = Router();

router.get('/all', async (req: Request, res: Response) => {
    await connection.connect();
    res.json({message: 'Enviando todos los usuarios',
        header: req.headers
    });

});

router.get('/disconect', async (req: Request, res: Response) => {
    res.json({message: 'Desconectando'});
    await connection.disconnect();
});


export default router;
