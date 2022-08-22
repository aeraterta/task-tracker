-- public.tasks definition

-- Drop table

-- DROP TABLE public.tasks;

CREATE TABLE public.tasks (
	id  serial PRIMARY KEY,
	taskname varchar NOT NULL,
	taskdue date NULL,
	isdone bool NULL,
	taskdone varchar NULL
);