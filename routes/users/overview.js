const express = require("express");
const app = express();
const User = require('../../models/user');
const axios = require('axios').default;
const Goal = require("../../models/goal");
var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));

// axios({
//   method: "get",
//   url: "/quotes",
//   baseURL: "https://type.fit/api",
//   transformResponse: [function (data) {
//     // Do whatever you want to transform the data
 
//     return data;
//   }],
// })
//   .then(function (response) {
//     response.data.text()
//   });

// app.post("/goals/create", (req,res)=>{
  
//   const {title, startDate,endDate,type,category} = req.body;

//     let goal = new Goal({title, startDate,endDate,type,category});

//     const userId = req.session.currentUser._id;

//     Goal
//       .create(goal)
//       .then((savedGoal)=>{

//           User
//             .findByIdAndUpdate(
//               {_id:userId},
//               {$push : {goals:savedGoal} }
//             )
//             .then((user)=>{
//                 res.redirect("/goals/myGoals")
//             });
            
//             console.log('New goal saved successfully', savedGoal._id);
//       })
//       .catch(err=>{
//         console.log('error while saving a goal', err);
//       })
// })

app.get('/users/overview', (req, res) => res.render('users/overview'));

module.exports = app;