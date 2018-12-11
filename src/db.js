// DB connection aide: https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-and-postgresql-db-masuu56t7
import pg from 'pg-promise';
import { Pool } from 'pg';
import dotenv from 'dotenv';
// import { dropTables, createTables } from "./models/models";
dotenv.config();

const connectionString = process.env.DATABASE_URL;

const createTables = () => {
  const pool = new Pool({ connectionString });
  pool.connect();

  const queryText =
    ` DROP TABLE IF EXISTS records;
      DROP TABLE IF EXISTS users;

    CREATE TABLE IF NOT EXISTS users(
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(128) UNIQUE NOT NULL,
                    firstname VARCHAR(128) NOT NULL,
                    lastname VARCHAR(128) NOT NULL,
                    othername VARCHAR(128),
                    email VARCHAR(128) UNIQUE NOT NULL,
                    password VARCHAR(128) NOT NULL,
                    phone VARCHAR(128) UNIQUE NOT NULL,
                    isAdmin VARCHAR(128),
                    registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                  );

    CREATE TABLE IF NOT EXISTS records(
                id SERIAL PRIMARY KEY,
                title VARCHAR(128) NOT NULL,
                createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                createdBy INT REFERENCES users(id),
                type TEXT NOT NULL,
                comment VARCHAR(128) NOT NULL,
                location VARCHAR(128) NOT NULL,
                status VARCHAR(128) NOT NULL,
                images VARCHAR(128),
                videos VARCHAR(128)
              );
    `;

  pool.query(queryText)
    .then(() =>  pool.end())
    .catch(() =>  pool.end());
}

createTables();
const pgProm = pg();

const db = pgProm(connectionString);

export default db;
