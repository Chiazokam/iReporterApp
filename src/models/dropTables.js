import dotenv from 'dotenv';
import db from './db';
import 'babel-polyfill';

dotenv.config();

const dropTables = async () => {
  await db.none (`BEGIN;
        DROP TABLE IF EXISTS records;
        DROP TABLE IF EXISTS users;
        COMMIT;`
  )
  .catch(err => console.log(err));
};

dropTables();

export default dropTables;
