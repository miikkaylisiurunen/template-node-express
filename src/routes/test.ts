import { Router } from 'express';
import { makeTestController } from '../controllers';

export const makeTestRoutes = (): Router => {
  const router = Router();
  const controller = makeTestController();

  router.get('/', controller.hello);

  return router;
};
