import { Pool } from 'pg';

let _pool: Pool | null = null;

export function getPool(databaseUrl: string): Pool {
  if (!_pool) {
    _pool = new Pool({ connectionString: databaseUrl });
  }
  return _pool;
}
