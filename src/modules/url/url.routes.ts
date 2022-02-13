import express from 'express';
import {validateRequest} from '../../middlewares/validator.middleware';

import URLController from './url.controller';
import {create} from "./url.schema";
import {auth} from "../../middlewares/auth.middleware";

const urlRouter = express.Router();

urlRouter.post('/',auth, validateRequest({body: create}), URLController.create);
urlRouter.get('/',auth, URLController.getURLs);
urlRouter.delete('/:id',auth, URLController.deleteURL);

export default urlRouter;