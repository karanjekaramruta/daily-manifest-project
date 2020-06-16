const express = require("express");
const app = express();
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


app.post("/goals/delete", (req,res)=>{
    debugger
    var goalId = req.query.id;

    console.log('goal id for deletion', goalId);

    Goal
      .findByIdAndDelete(goalId)
      .then((goal)=>{ 
          res.redirect("/users/overview");
      })
      .catch(err=>{
        console.log('error while saving a goal', err);
      })
})

module.exports = app;
