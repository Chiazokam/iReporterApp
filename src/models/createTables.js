import db from './db';
import dotenv from 'dotenv';
import 'babel-polyfill';
dotenv.config();

const createTables = async () => {
   await db.none(`BEGIN;
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(128) UNIQUE NOT NULL,
      firstname VARCHAR(128) NOT NULL,
      lastname VARCHAR(128) NOT NULL,
      othername VARCHAR(128),
      email VARCHAR(128) UNIQUE NOT NULL,
      password VARCHAR(128) NOT NULL,
      phone VARCHAR(128) NOT NULL,
      isAdmin BOOLEAN DEFAULT false,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
                      isAdmin)
          VALUES('Zokky', 'Chiazokam', 'Echeta', 'Chioma' , 'chiazokamecheta@gmail.com', '$2b$10$LAkfreG/ayNEne9.cnJnp.HnvjsJzraz/uN.Mcv4XIKzQxY.W6/fW', '07032425466', true);
    COMMIT;
    `).catch(console.log);

    /* Token
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJDYXJ0YSIsImVtYWlsIjoi
    Y2FydEBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJDb2xsaW5zIiwibGFzdG5hbWUiOiJDYXJ0ZWwiLCJvdGhlcm5hbWUi
    OiJDYXJ0IiwicGhvbmUiOiIwOTA2NzU0Njc4MCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1NDUwMDA5NDQsImV4cCI6MTU
    0NTE3Mzc0NH0.3YGFfVvUS88YpzMcPuM70p15N4hBRK0yH8hw92on1r8
    */
};

createTables();


