const express = require("express");
const app = express();
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
var dateFormat = require('dateformat');
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/goals/detail", (req, res) => {

  //get the goal id from req
  const goalId = req.query.id;

    Goal
      .findById(goalId)
      .then((goal)=>{

        var performedTasks = goal.tasks.filter((task)=>{
          return task.done === true;
        });

        var totalTasks = goal.tasks.length;

        
        let percentageCompletion = 0;
        if(performedTasks.length !== 0){
          percentageCompletion = Math.floor((performedTasks.length/totalTasks)*100);
        }

        console.log('percentageCompletion', percentageCompletion);

        debugger

        const modifiedGoal = {
            ...goal._doc,
            percentCompletion:percentageCompletion,
            dueDate:dateFormat(goal.endDate,"mediumDate")
        }
        
        res.render('goals/detail', {goal:modifiedGoal});
      })
      .catch((err)=>{
        console.log('error while fetching goals for the user', err);
      })
});


module.exports = app;
