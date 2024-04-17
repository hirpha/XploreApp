require("express-async-errors");
require("dotenv").config();
const bodyParser = require("body-parser");
// user = require("./user.js");
// category = require("./category.js");
const express = require("express");
const session = require("express-session");
const app = express();

const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const userRoutes = require('./routes/user_route')

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

const { notFound, errorHandler } = require('./middleware/error_middleware')
// app.use("/api/user", user);
// app.use("/api/category", category);

app.use("/api/user", userRoutes)

app.use('/uploads', express.static('uploads'))
app.use(cors())

app.use(notFound)
app.use(errorHandler)
app.get("", (req, res)=>{
  res.send({
    "status":true,
    "message":"server is working"
  })
})
app.post("/", (req, res) => {
  console.log(req.body);
  res.status(400).json({ working: "working" });
});

module.exports = app;