import express from 'express';
import smsController from './controllers/smsController';
import errorHandler from './middlewares/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/sms', smsController);

app.use(errorHandler);

export default app;
