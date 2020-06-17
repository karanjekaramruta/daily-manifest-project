const express = require("express");
const app = express();
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/goals/delete", (req, res, err) => {
  var goalId = req.query.id;

  Goal.findByIdAndDelete(goalId)
    .then((goal) => {
      res.send("success");
    })
    .catch((err) => {
      console.log("error while saving a goal", err);
      next(err);
    });
});

module.exports = app;
