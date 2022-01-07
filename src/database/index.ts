import { Client } from 'pg';

const ssl =
  process.env.NODE_ENV === 'production'
    ? {
        rejectUnauthorized: false,
      }
    : false;

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl,
});

db.connect((err) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('PostgreSQL connection successful!');
  }
});

export default db;
