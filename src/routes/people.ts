import { Router } from 'express';
import { makePeopleController } from '../controllers';
import { Queries } from '../database';
import { Middleware } from '../middleware';

export const makePeopleRoutes = (queries: Queries, middleware: Middleware): Router => {
  const router = Router();
  const controller = makePeopleController(queries);

  router.get('/', middleware.exampleLogger, controller.getAllPeople);
  router.post('/', controller.addPerson);

  return router;
};
