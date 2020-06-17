const express = require("express");
const app = express();
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/goals/update", (req, res,err) => {
  let goalId = req.query.id;
  const taskId = req.query.taskId;

  Goal.findOneAndUpdate(
    { "tasks._id": taskId },
    { $set: { "tasks.$.done": true } }
    )
    .then((goal) => {
      res.send("success");
    })
    .catch((err) => {
      console.log("err updating goal", err);
      next(err);
    });
});

module.exports = app;
