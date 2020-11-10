import { Router } from 'express';

export const routes = Router();

routes.get('/', (req: any, res: any) => {
    res.status(200).json({
        message: 'ok',
    });
});
