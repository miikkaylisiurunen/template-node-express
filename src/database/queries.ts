import { Pool, QueryResult } from 'pg';
import { getPool, Person, Queries } from '.';
import { HttpError } from '../errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function query<Result extends Record<string, any> = any, Args extends any[] = any[]>(
  pool: Pool,
  query: string,
  args?: Args,
): Promise<QueryResult<Result>> {
  return await pool.query(query, args);
}

export const makeQueries = (databaseUrl: string): Queries => {
  const pool = getPool(databaseUrl);
  return {
    getAllPeople: async () => {
      const { rows } = await query<Person>(
        pool,
        `
        SELECT name, age
        FROM people
        `,
      );
      return rows;
    },
    addPerson: async ({ name, age }) => {
      const { rows, rowCount } = await query<Person, [string, number]>(
        pool,
        `
        INSERT INTO people (name, age)
        VALUES ($1, $2)
        RETURNING name, age
        `,
        [name, age],
      );
      if (rowCount !== 1) {
        throw new HttpError(500, 'Something went wrong');
      }
      return rows[0];
    },
  };
};
