import express, { Express } from 'express';
import testRouter from './routes/testRouter';

export function makeApp(): Express {
  const app = express();
  app.use(express.json());

  app.use('/', testRouter);

  return app;
}
