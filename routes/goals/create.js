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
  
  const {title, description, startDate,endDate,type,category} = req.body;

    let goal = new Goal({title, description, startDate,endDate,type,category});

    Goal
      .create(goal)
      .then((savedGoal)=>{
        console.log('New goal saved successfully', savedGoal._id);
        res.redirect("users/overview");
      })
      .catch(err=>{
        console.log('error while saving a goal', err);
      })
})

module.exports = app;
