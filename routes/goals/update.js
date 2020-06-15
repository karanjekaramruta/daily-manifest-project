const express = require("express");
const app = express();
const User = require("../../models/user");
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));



app.post("/goals/update", (req,res)=>{

    let goalId = req.query.id;
    const taskId = req.query.taskId;
    console.log('goal id to update task',goalId);
    console.log('task id to update task',taskId);
    Goal
      .findOneAndUpdate({'tasks._id':taskId}, {'$set':{"tasks.$.done":true}})
      .then(goal=>{
        res.send("success");
      })
      .catch(err=>{
        console.log('err updating goal', err)
      })


    
})


module.exports = app;
