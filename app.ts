import express, {Request, Response} from 'express';
import apiRouter from "./src/routes/v1";
import {errorHandlerMiddleware} from "./src/middlewares/error-handler.middleware";

const app = express();
app.use(express.json());
app.use("/api", apiRouter);

app.all('*', async (req: Request, res: Response) => {
  res.status(404).send('Not Found!');
});

app.use(errorHandlerMiddleware)

export default app;