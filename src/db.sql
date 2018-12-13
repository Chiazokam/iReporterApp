DROP DATABASE IF EXISTS ireporter;
CREATE DATABASE ireporter;

\c ireporter;

-- USERS TABLE
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

-- RECORDS TABLE
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