const express = require("express");
const app = express();
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
var dateFormat = require('dateformat');
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/goals/updateGoal", (req,res)=>{
  
  let goalId = req.query.id;

  Goal
    .findById(goalId)
    .then((goal)=>{
      console.log('goal for update', goal);
      var startDateModified = dateFormat(goal.startDate,"isoDate");
      console.log('startDateModified', startDateModified);
      var endDateModified = dateFormat(goal.endDate, "isoDate");
      
      res.render("goals/updateGoal", {goal:goal,startDateModified:startDateModified,endDateModified:endDateModified});
    })
    .catch(err=>{
      console.log(err);
    })
})



app.post("/goals/updateGoal", (req,res)=>{
    debugger
    let goalId = req.query.id;

    const updatedGoal = {
      title:req.body.title,
      startDate:req.body.startDate,
      endDate:req.body.endDate,
      category:req.body.category,
      type:req.body.type
    }

    Goal
      .findByIdAndUpdate(goalId, updatedGoal, {new:true})
      .then(goal=>{
        console.log('updated goal', goal);
        res.redirect(`/goals/detail?id=${goalId}`);
      })
      .catch(err=>{
        console.log('err updating goal', err)
      })


    
})


module.exports = app;
