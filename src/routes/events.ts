import { Router } from 'express';
import { makeEventsController } from '../controllers/health';
import { AppContext } from '../app';

export const makeEventsRoutes = (ctx: AppContext): Router => {
  const router = Router();

  if (!ctx.db) {
    throw new Error('Database connection is not available');
  }

  const db = ctx.db;
  //   const controller = makeEventsController(ctx);

  //   router.get('/', controller.EventsCheck);
  router.get('/', async (_req, res) => {
    const result = await db.query('SELECT id, name, date, capacity FROM events ORDER BY id');

    return res.json(result.rows);
  });
  router.post('/', async (req, res) => {
    const name = req.body.name;
    const date = req.body.date;
    const capacity = req.body.capacity;

    if (!name) {
      return res.status(400).send('error');
    }

    const event = await db.query(
      `INSERT INTO events (name, date, capacity)
     VALUES ('${name}', '${date}', ${capacity})
     RETURNING *`,
    );

    res.status(200).json(event.rows[0]);
  });

  return router;
};
