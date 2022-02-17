import express from 'express';
import userRouter from '../../modules/user/user.routes';
import urlRouter from '../../modules/url/url.routes';
import reportRouter from '../../modules/report/report.routes';

const apiRouter = express.Router();

apiRouter.use('/v1/users', userRouter);
apiRouter.use('/v1/urls', urlRouter);
apiRouter.use('/v1/reports', reportRouter);

export default apiRouter;
