import express, { Express } from 'express';
import { makeTestRoutes } from './routes';

export function makeApp(): Express {
  const app = express();
  app.use(express.json());

  app.use('/', makeTestRoutes());

  return app;
}
