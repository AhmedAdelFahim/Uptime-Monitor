import express, {Request, Response} from 'express';
import apiRouter from "./src/routes/v1";
import {errorHandlerMiddleware} from "./src/middlewares/error-handler.middleware";
import morganMiddleware from "./src/middlewares/morgan";
import swaggerUi from 'swagger-ui-express'
import {swaggerDocument} from "./src/docs/v1";
const app = express();
app.use(express.json());
app.use(morganMiddleware);
app.use("/api", apiRouter);
app.use('/api/v1/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.all('*', async (req: Request, res: Response) => {
  res.status(404).send({messages: ['Not Found!'], code: 404});
});

app.use(errorHandlerMiddleware)

export default app;