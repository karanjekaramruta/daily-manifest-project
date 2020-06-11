const express = require("express");
const app = express();
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/goals/myGoals", (req, res) => {

    //get all goals of the current user
    res.render("goals/myGoals");
});


module.exports = app;
