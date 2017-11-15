DROP DATABASE IF EXISTS notes;
CREATE DATABASE notes;

\c notes;

CREATE TABLE notes (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  author VARCHAR,
  message VARCHAR
);

INSERT INTO notes (title, author, message)
  VALUES ('Hi', 'Me', 'First note');