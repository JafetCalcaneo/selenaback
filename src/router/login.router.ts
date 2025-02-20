import { Request, Response, Router } from 'express';


const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    res.json({message: 'Endpoint correcto',
        header: req.headers
    });
    console.log(req.headers);
});



export default router;