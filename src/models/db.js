// DB connection aide: https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-and-postgresql-db-masuu56t7
import pg from 'pg-promise';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
<<<<<<< HEAD
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}
const connectionString = config;
=======
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'process.env.PASSWORD',
  database: 'ireporter'
}
const connectionString = process.env.DATABASE_URL || config;
>>>>>>> db082357e3a6c3774f68bf39b4681900dad4c546
const pgProm = pg();

const db = pgProm(config);

export default db;
