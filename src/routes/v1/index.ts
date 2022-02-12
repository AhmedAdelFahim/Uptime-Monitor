import express from 'express';
import userRouter from '../../modules/user/user.routes';
import urlRouter from '../../modules/url/url.routes';

const apiRouter = express.Router();

apiRouter.use("/v1/users", userRouter);
apiRouter.use("/v1/urls", urlRouter);

export default apiRouter;