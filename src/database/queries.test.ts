import { afterAll, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import { z } from 'zod';
import { applyMigrations, getPool, makeQueries, Person, Queries } from '.';
import { getConfig } from '../config';

describe('queries', () => {
  const config = getConfig('TEST_');
  let queries: Queries;

  // migrate up and create app before all tests
  beforeAll(async () => {
    await applyMigrations(config.databaseUrl, 'up');
    queries = makeQueries(config.databaseUrl);
  });

  // empty database before each test
  beforeEach(async () => {
    const pool = getPool(config.databaseUrl);
    await pool.query('DELETE FROM people');
  });

  // migrate down and close database connection after all tests
  afterAll(async () => {
    await applyMigrations(config.databaseUrl, 'down');
    await getPool(config.databaseUrl).end();
  });

  describe('.getAllPeople and .addPerson', () => {
    it('gets all people and adds to the database', async () => {
      const people1 = await queries.getAllPeople();
      expect(people1).toHaveLength(0);

      await queries.addPerson({ name: 'Joe', age: 20 });
      await queries.addPerson({ name: 'John', age: 21 });

      const people2 = await queries.getAllPeople();
      expect(people2).toHaveLength(2);
      z.array(Person.strict()).parse(people2);
    });
  });
});
