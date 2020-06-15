const express = require("express");
const app = express();
const User = require("../../models/user");
var bodyParser = require("body-parser");
var dateFormat = require('dateformat');
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/goals/myGoals", (req, res) => {

    User
      .findById(req.session.currentUser._id)
      .populate('goals')
      .then((user)=>{

          debugger;
          var goals = user.goals.map((goal,index)=>{

            console.log("tasks", goal.tasks);
            console.log("total Tasks are ", goal.tasks.length);

            var performedTasks = goal.tasks.filter((task)=>{
              return task.done === true;
            });
            console.log('performed Tasks', performedTasks.length);

            const percentageCompletion = (performedTasks.length/goal.tasks.length)*100
            console.log('%completion', percentageCompletion);

            var index=index++;

            return {
              index:index,
              id:goal._id,
              title:goal.title,
              tasks:goal.tasks,
              performedTasks:goal.performedTasks,
              category:goal.category,
              percentCompletion:percentageCompletion,
              dueDate:dateFormat(goal.endDate,"mediumDate")
            }
          });
          

          res.render('goals/myGoals', {goals:goals});
      })
      .catch((err)=>{
        console.log('error while fetching goals for the user', err);
      })


    //get all goals of the current user
});


module.exports = app;
