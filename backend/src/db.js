const Pool = require('pg').Pool;

const P = new Pool({
  user: process.env.USER || 'postgres',
  host: process.env.HOST ||'localhost',
  database: process.env.DATABASE ||'postgres',
  password: process.env.PASSWORD ||'todolist',
  port: process.env.PORT || 5432,
})
 
console.log(P);

module.exports = P;
