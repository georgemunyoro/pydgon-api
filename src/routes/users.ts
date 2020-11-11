import * as express from 'express';
import * as userController from '../controllers/userController';

export const userRouter = express.Router();

userRouter.get('/', userController.userList);
userRouter.get('/:userId', userController.userDetail);
