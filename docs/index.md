# Task Tracker App

For full documentation visit [mkdocs.org](https://www.mkdocs.org).

## Framework

Below is the technical specifications of the Task Tracker App

* Frontend (React 17.0.1)
* Backend (Node latest)
* Database (Postgresql 14-alpine)

## Architecture

Docker Infrastructure: 

* React
* NodeJs
* Postgresql

## Local Installation

### Individual Usage

#### Fronted

In the backend folder, run the command to install all Node dependencies:
```
npm install
```
Once done, run the script below to initiate server run:
```
npm start
```
Open a browser of your choice and type in:
```
localhost:3000
```

#### Backend

In the backend folder, run the command to install all Node dependencies:
```
npm install
```
Once done, run the script below to initiate server run:
```
nodemon index.js
```

#### Database

For the current set-up, the Alpine version of Postgresql in the Docker Hub is used. Run the script in the command line once Docker is installed in the machine:
```
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=todolist -d postgres
```
You may use a third-party application to view the database running in Docker. Create the **tasks** table using the script below:
```
-- Creation of tasks table
CREATE TABLE IF NOT EXISTS tasks (
	id  serial PRIMARY KEY,
	taskname varchar NOT NULL,
	taskdue varchar NULL,
	isdone bool NULL,
	tstamp timestamptz
);
```
### Docker Usage

Run the command below to start-up Docker deployment:
```
docker compose up --build
```
Once done, open a browser of your choice and type in:
```
localhost:8000
```
