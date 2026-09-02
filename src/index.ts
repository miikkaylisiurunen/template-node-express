import { makeApp } from './app';
import { getConfig } from './config';
import { applyMigrations } from './database/migrate';
import { makeQueries } from './database/queries';
import { makeLogger } from './logger';
import { makeMiddleware } from './middleware';
import { getPool } from './database/pool';

async function main() {
  const config = getConfig();

  await applyMigrations(config.databaseUrl, 'up');
  const logger = makeLogger();
  const queries = makeQueries(config.databaseUrl);
  const middleware = makeMiddleware(logger);
  const db = getPool(config.databaseUrl);
  const app = makeApp({ queries, middleware, db });

  app.listen(config.port, () => {
    logger.info(`Server is up on port ${config.port}`);
  });
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
