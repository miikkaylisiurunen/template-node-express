import * as dotenv from 'dotenv';
import { z } from 'zod';

export const Config = z.object({
  port: z.number().positive(),
  databaseUrl: z.string(),
});
export type Config = z.infer<typeof Config>;

function readFromEnv(name: string, prefix?: string): string | undefined {
  return process.env[`${prefix ?? ''}${name}`];
}

export const getConfig = (prefix?: string): Config => {
  dotenv.config();
  const port = readFromEnv('PORT', prefix);
  return Config.parse({
    port: port ? parseInt(port, 10) : undefined,
    databaseUrl: readFromEnv('DATABASE_URL', prefix),
  });
};
