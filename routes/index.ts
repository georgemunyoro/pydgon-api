import { Router } from 'express';

export const routes = new Router();

routes.get('/', (req: any, res: any) => {
    res.status(200).json({
        message: 'ok',
    });
});
