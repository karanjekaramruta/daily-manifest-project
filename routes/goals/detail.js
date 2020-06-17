const express = require("express");
const app = express();
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
var dateFormat = require("dateformat");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/goals/detail", (req, res,next) => {
  const goalId = req.query.id;

  Goal.findById(goalId)
    .then((goal) => {
      let performedTasks = goal.tasks.filter((task) => {
        return task.done === true;
      });

      let totalTasks = goal.tasks.length;

      let percentageCompletion =
        performedTasks.length !== 0
          ? Math.floor((performedTasks.length / totalTasks) * 100)
          : 0;

      const modifiedGoal = {
        ...goal._doc,
        percentCompletion: percentageCompletion,
        dueDate: dateFormat(goal.endDate, "mediumDate"),
      };

      res.render("goals/detail", { goal: modifiedGoal });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = app;
