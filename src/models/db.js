// DB connection aide: https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-and-postgresql-db-masuu56t7
import pg from 'pg-promise';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'process.env.PASSWORD',
  database: 'ireporter'
}
const connectionString = process.env.DATABASE_URL || config;
const pgProm = pg();

const db = pgProm(config);

export default db;
