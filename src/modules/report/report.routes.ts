import express from 'express';
import {validateRequest} from '../../middlewares/validator.middleware';

import ReportController from './report.controller';
import {get} from './report.schema';
import {auth} from '../../middlewares/auth.middleware';

const reportRouter = express.Router();

reportRouter.post('/', auth, validateRequest({body: get}), ReportController.getReport);

export default reportRouter;
