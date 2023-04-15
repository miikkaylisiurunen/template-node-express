import express, { Express } from 'express';
import { Queries } from './database';
import { makeMiddleware } from './middleware';
import { makePeopleRoutes } from './routes';

export function makeApp(queries: Queries): Express {
  const app = express();
  app.use(express.json());

  const middleware = makeMiddleware();
  app.use('/people', makePeopleRoutes(queries, middleware));

  app.use(middleware.routeNotFound);
  app.use(middleware.errorHandler);

  return app;
}
