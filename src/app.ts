import express, { Express } from 'express';
import { Queries } from './database';
import { makePeopleRoutes } from './routes';

export function makeApp(queries: Queries): Express {
  const app = express();
  app.use(express.json());

  app.use('/people', makePeopleRoutes(queries));

  return app;
}
