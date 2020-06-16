const express = require("express");
const app = express();
const User = require("../../models/user");
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


app.post("/tasks/create", (req,res)=>{
  debugger
  Goal
    .findByIdAndUpdate(req.query.id, {$push : {tasks:{title:req.query.title}} }, {new:true})
    .then((updatedGoal)=>{
      var length = updatedGoal._doc.tasks.length;
      var tasks = updatedGoal._doc.tasks;
      var task = tasks[length-1];
      var taskId = task._doc._id;
      res.send({taskId:taskId});
    })
    .catch(err=>console.log(err))
    
});


module.exports = app;
