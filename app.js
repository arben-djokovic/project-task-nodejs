const express = require("express")
var bodyParser = require('body-parser');
const db = require('./data/database');
require('dotenv').config();
const User = require("./models/User")
const authRoutes = require("./routes/AuthRoutes")
const postRoutes = require("./routes/PostRoutes");
const tagRoutes = require("./routes/TagRoutes");
const commentRoutes = require("./routes/CommentRoutes");
const { verifyToken } = require("./middlewares/middleware");

const app = express()


app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/user", authRoutes)
app.use("/post", postRoutes)
app.use("/tag", tagRoutes)
app.use("/comment", commentRoutes)


db.connection()
  .then(() => {
    app.listen(3000); 
  })
  .catch(err => {
    console.error("Failed to start server due to database connection error", err);
  });