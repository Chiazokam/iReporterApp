import db from './db';
import dotenv from 'dotenv';
import 'babel-polyfill';
dotenv.config();

const createTables = async () => {
  const development = 'dev';
  if (process.env.ENVIRONMENT === development) {
    await db.none(`BEGIN;
      DROP TABLE IF EXISTS records;
      DROP TABLE IF EXISTS users;
      COMMIT;`
    ).catch(err => console.log(err));
  }
   await db.none(`BEGIN;
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
    COMMIT;`
  ).catch(console.log);

  await db.none(`BEGIN;
    INSERT INTO users(username,
                      firstname,
                      lastname,
                      othername ,
                      email,
                      password,
                      phone,
                      isAdmin,
                      registered)
          VALUES('Zokky', 'Chiazokam', 'Echeta', 'Chioma' , 'chiazokamecheta@gmail.com', 'root', '07032425466', 'yes', '03-06-18');
    COMMIT;
    `).catch(console.log);
};

createTables();
