-- Creation of tasks table
CREATE TABLE IF NOT EXISTS tasks (
	id  serial PRIMARY KEY,
	taskname varchar NOT NULL,
	taskdue varchar NULL,
	isdone bool NULL,
	tstamp timestamptz
);