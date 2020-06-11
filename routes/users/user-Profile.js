const express = require("express");
const app = express();
const User = require("../../models/user");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/user-profile/:id", (req, res) => {

User.findById(req.params.id)
  .then((data) =>{
res.render("users/user-profile",{upload:data});

  })
.catch((err)=> {

  res.send('err');

})


});

app.post("/user-profile", (req,res)=>{
  
  const {firstName, lastName, dateOfBirth, address,hobbies, occupation} = req.body;

    let user = new User({firstName, lastName, dateOfBirth, address, hobbies, occupation});

    User
      .findByIdAndUpdate(user)
      .then((userData)=>{
        console.log('user Created', userData._id)
      })
      .catch(err=>{
        console.log('error while saving a goal', err);
      })
})

module.exports = app;
