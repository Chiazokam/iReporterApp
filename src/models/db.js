// DB connection aide: https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-and-postgresql-db-masuu56t7
import pg from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}
 
const connectionString = process.env.DATABASE_URL;
const pgProm = pg();

const db = pgProm(connectionString);

export default db;
