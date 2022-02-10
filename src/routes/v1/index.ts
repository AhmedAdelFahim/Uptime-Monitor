import express from 'express';
import userRouter from '../../modules/user/user.routes';

const apiRouter = express.Router();

apiRouter.use("/v1/users", userRouter);

export default apiRouter;