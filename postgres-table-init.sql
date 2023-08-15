-- Creation of tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id serial PRIMARY KEY,
    taskname varchar NOT NULL,
    taskdue varchar NULL,
    isdone bool NULL,
    tstamp timestamptz
);

-- Creation of users table
CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    username varchar NOT NULL,
    email varchar NOT NULL,
    password varchar NOT NULL,
    tstamp timestamptz
);

-- Inserting initial user
INSERT INTO users (username, email, password, tstamp)
VALUES ('initial_user', 'user@example.com', 'password123', current_timestamp);
