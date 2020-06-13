const express = require("express");
const app = express();
const User = require("../../models/user");
var bodyParser = require("body-parser");
var dateFormat = require('dateformat');
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/goals/myGoals", (req, res) => {

    User
      .findById(req.session.currentUser._id)
      .populate('goals')
      .then((user)=>{
          var goals = user.goals.map((goal)=>{
            return {
              ...goal,
              dueDate:dateFormat(goal.endDate,"mediumDate")
            }
          });
          console.log('modifiedGoals', goals)
          

          res.render('goals/myGoals', {goals:user.goals});
      })
      .catch((err)=>{
        console.log('error while fetching goals for the user', err);
      })


    //get all goals of the current user
});


module.exports = app;
