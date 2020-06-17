const express = require('express');
const app = express();
const User = require('../../models/user');
const dateFormat = require('dateformat');
const now = new Date();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/users/overview', (req, res, next) => {
  User
    .findById(req.session.currentUser._id)
    .populate('goals')
    .then((user)=>{
        let goals = user.goals.map((goal) => {
        let currentMonth = dateFormat(now,'m');
        let goalStartMonth = dateFormat(goal.startDate,'m');
        let isCurrentMonth = false;

        if (goalStartMonth === currentMonth) {
          isCurrentMonth = true;
        }

        let isUpcoming = false;
        if (goalStartMonth > currentMonth) {
          isUpcoming = true;
        }

        let performedTasks = goal.tasks.filter((task) => {
          return task.done === true;
        });

        let percentageCompletion = 0;
        if (performedTasks.length !== 0) {
          percentageCompletion = Math.floor(
            (performedTasks.length / goal.tasks.length) * 100
          );
        }

        let goalExists = true;
        if (goal._id !== "") {
          goalExists = false;
        }

        let openTasks = goal.tasks.length - performedTasks.length;

      return {
        id:goal._id,
        title:goal.title,
        tasks:goal.tasks,
        performedTasks:goal.performedTasks,
        category:goal.category,
        percentCompletion:percentageCompletion,
        dueDate:dateFormat(goal.endDate,'mediumDate'),
        goalExists:goalExists,
        isCurrentMonth:isCurrentMonth,
        isUpcoming:isUpcoming,
        openTasks:openTasks
      }
    });

      let closedGoals = goals.filter((goal) => {
        return goal.percentCompletion === 100;
      });

      let openTaskCounter = 0;
      goals.forEach((goal) => {
        openTaskCounter = openTaskCounter + goal.openTasks;
      });

      let openGoals = user.goals.length - closedGoals.length;

      res.render("users/overview", {
        goals: goals,
        openGoals: openGoals,
        closedGoals: closedGoals.length,
        openTasks: openTaskCounter,
      });
    })

    .catch((err) => {
      console.log("Error while fetching goals", err);
      next(err);
    });
});

module.exports = app;
