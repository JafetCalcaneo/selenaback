import { Request, Response, Router } from 'express';
import connection from '../db/connection';

const router = Router();

router.get('/all', async (req: Request, res: Response) => {
    res.json({message: 'Enviando todos los usuarios'});
    await connection.connect();

});

router.get('/disconect', async (req: Request, res: Response) => {
    res.json({message: 'Desconectando'});
    await connection.disconnect();
})


export default router;
