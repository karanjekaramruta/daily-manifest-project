const express = require("express");
const app = express();
const User = require("../../models/user");
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/tasks/create", (req, res) => {
  
  res.redirect('/goals/myGoals');

    //get all goals of the current user
});


module.exports = app;
