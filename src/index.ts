import { makeApp } from './app';
import { getConfig } from './config';
import { applyMigrations, makeQueries } from './database';

async function main() {
  const config = getConfig();
  await applyMigrations(config.databaseUrl, 'up');
  const queries = makeQueries(config.databaseUrl);
  const app = makeApp(queries);
  app.listen(config.port, () => {
    console.log(`Server is up on port ${config.port}`);
  });
}

main().catch((error) => {
  console.log(error);
});
