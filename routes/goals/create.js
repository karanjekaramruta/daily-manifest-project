const express = require("express");
const app = express();
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/goals/create", (req, res) => {
    res.render("goals/create");
});

app.post("/goals/create", (req,res)=>{
  debugger
    console.log(req.body);
})

module.exports = app;
