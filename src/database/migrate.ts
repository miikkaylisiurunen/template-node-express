import migrate from 'node-pg-migrate';
import path from 'path';

export async function applyMigrations(databaseUrl: string, direction: 'up' | 'down') {
  await migrate({
    count: Number.POSITIVE_INFINITY,
    databaseUrl: databaseUrl,
    dir: path.resolve(__dirname, '../../migrations'),
    direction,
    migrationsTable: 'migrations',
    verbose: false,
  });
}
