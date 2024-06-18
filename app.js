const express = require("express")
var bodyParser = require('body-parser');
const db = require('./data/database');
require('dotenv').config();

const app = express()


app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


db.connection()
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.error("Failed to start server due to database connection error", err);
  });