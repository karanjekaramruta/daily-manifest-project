const express = require("express");
const app = express();
const Goal = require("../../models/goal");
const User = require("../../models/user");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/goals/create", (req, res) => {
    res.render("goals/create");
});

app.post("/goals/create", (req,res)=>{
  
  const {title, description, startDate,endDate,type,level,category,priority} = req.body;

    let goal = new Goal({title, description, startDate,endDate,type,level,category,priority});

    debugger
    const userId = req.session.currentUser._id;

    Goal
      .create(goal)
      .then((savedGoal)=>{

          User
            .findByIdAndUpdate(
              {_id:userId},
              {$push : {goals:savedGoal} }
            )
            .then((user)=>{
                res.redirect("/goals/myGoals")
            });
            
            console.log('New goal saved successfully', savedGoal._id);
      })
      .catch(err=>{
        console.log('error while saving a goal', err);
      })
})

module.exports = app;
