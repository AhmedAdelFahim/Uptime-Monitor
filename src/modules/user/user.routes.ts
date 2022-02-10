import express from 'express';
import {validateRequest} from '../../middlewares/validator.middleware';

import UserController from './user.controller';
import {signUp} from "./user.schema";

const userRouter = express.Router();

userRouter.post('/', validateRequest({body: signUp}), UserController.signUp);
// userRouter.get('/users/:id', validateRequest(getUserValidation), UserController.getUser);
// userRouter.post('/users', UserController.signUp);

export default userRouter;