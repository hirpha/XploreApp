require("express-async-errors");
require("dotenv").config();
const bodyParser = require("body-parser");
// user = require("./user.js");
// category = require("./category.js");
const express = require("express");
const session = require("express-session");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// app.use("/api/user", user);
// app.use("/api/category", category);
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
