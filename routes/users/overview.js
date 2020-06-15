const express = require("express");
const app = express();
const User = require('../../models/user');
const axios = require('axios').default;
const Goal = require("../../models/goal");
const dateFormat = require('dateformat');
const now = new Date();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/users/overview', (req, res) => {

  User
    .findById(req.session.currentUser._id)
    .populate('goals')
    .then((user)=>{
      var goals = user.goals.map((goal) => {
        let currentMonth = dateFormat(now,"m");
        let goalStartMonth = dateFormat(goal.startDate,"m");
        let goalEndMonth = dateFormat(goal.endDate,"m");

        let isCurrentMonth = false;
        if(goalStartMonth === currentMonth && goalEndMonth === currentMonth) {
          isCurrentMonth = true;
        }

        let isUpcoming = false;
        if(goalStartMonth > currentMonth) {
          isUpcoming = true;
        }

      console.log("tasks", goal.tasks);
      console.log("total Tasks are ", goal.tasks.length);

      var performedTasks = goal.tasks.filter((task)=>{
        return task.done === true;
      });
      console.log('performed Tasks', performedTasks.length);

      const percentageCompletion = (performedTasks.length/goal.tasks.length)*100
      console.log('%completion', percentageCompletion);

      return {
        id:goal._id,
        title:goal.title,
        tasks:goal.tasks,
        performedTasks:goal.performedTasks,
        category:goal.category,
        percentCompletion:percentageCompletion,
        dueDate:dateFormat(goal.endDate,"mediumDate"),
        isCurrentMonth:isCurrentMonth,
        isUpcoming:isUpcoming
      }
    });

        res.render('users/overview', {goals});
    })

    .catch((err)=>{
      console.log('Error while fetching goals', err);
    })
  
});

module.exports = app;