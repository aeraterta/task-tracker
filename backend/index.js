const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

require('./src/routes/task')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to task tracker API!',
}));