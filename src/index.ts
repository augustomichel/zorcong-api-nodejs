import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandlerApp } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';
import productRouter from './routes/productRoutes';
import 'express-async-errors';
import { errors } from 'celebrate';
import orderRouter from './routes/orderRoutes';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(productRouter);
app.use(orderRouter);

app.use(errors());

app.use(errorHandlerApp);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
