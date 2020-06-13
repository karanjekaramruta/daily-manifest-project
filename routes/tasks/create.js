const express = require("express");
const app = express();
const User = require("../../models/user");
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/tasks/create", (req, res) => {

  const goalId = req.query.id;
  Goal
    .findById(goalId)
    .then((goal)=>{
      res.render('tasks/create', {id:req.query.id, tasks:goal.tasks});
    })
    .catch(err=>{
      console.log(err);
    })

});

app.post("/tasks/create", (req,res)=>{

  Goal
    .findByIdAndUpdate(req.query.id, {$push : {tasks:{title:req.body.title}} }, {new:true})
    .then((updatedGoal)=>{
      console.log(updatedGoal);
      res.redirect(`/tasks/create?id=${req.query.id}`);
    })
    .catch(err=>console.log(err))
    
})


module.exports = app;
