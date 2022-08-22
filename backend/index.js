const express = require('express');
const bodyParser = require('body-parser');
const Pool = require('pg').Pool;

const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'todolist',
  port: 5432,
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

require('./src/routes/task')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to task tracker API!',
}));