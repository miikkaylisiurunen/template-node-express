import { Router } from 'express';
import { makePeopleController } from '../controllers';
import { Queries } from '../database';

export const makePeopleRoutes = (queries: Queries): Router => {
  const router = Router();
  const controller = makePeopleController(queries);

  router.get('/', controller.getAllPeople);
  router.post('/', controller.addPerson);

  return router;
};
