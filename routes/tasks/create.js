const express = require("express");
const app = express();
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/tasks/create", (req, res,next) => {

  Goal.findByIdAndUpdate(
    req.query.id,
    { $push: { tasks: { title: req.query.title } } },
    { new: true }
  )
    .then((updatedGoal) => {
      let length = updatedGoal._doc.tasks.length;
      let tasks = updatedGoal._doc.tasks;
      let task = tasks[length - 1];
      let taskId = task._doc._id;
      res.send({ taskId: taskId });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = app;
