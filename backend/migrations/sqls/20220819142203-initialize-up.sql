-- public.tasks definition

-- Drop table

-- DROP TABLE public.tasks;

CREATE TABLE public.tasks (
	id  serial PRIMARY KEY,
	taskname varchar NOT NULL,
	taskdue varchar NULL,
	isdone bool NULL,
	taskdone varchar NULL
);