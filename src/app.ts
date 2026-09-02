import express, { Express } from "express";
import { Queries } from "./database/queries";
import { Middleware } from "./middleware";
import { makePeopleRoutes } from "./routes/people";
import { makeHealthRoutes } from "./routes/health";
import { makeEventsRoutes } from "./routes/events";
import type { Pool } from "pg";

export interface AppContext {
  queries: Queries;
  middleware: Middleware;
  db?: Pool;
}

export function makeApp(ctx: AppContext): Express {
  const app = express();
  app.use(express.json());
  app.use(ctx.middleware.logger);

  app.use("/health", makeHealthRoutes(ctx));
  app.use("/people", makePeopleRoutes(ctx));
  app.use("/events", makeEventsRoutes(ctx));

  app.use(ctx.middleware.routeNotFound);
  app.use(ctx.middleware.errorHandler);

  return app;
}
