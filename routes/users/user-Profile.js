const express = require("express");
const app = express();
const User = require("../../models/user");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/users/user-profile/", (req, res) => {
//console.log(req.session.currentUser._id)deb
debugger
  User.findById(req.session.currentUser._id)
    .then((user) =>{
      
      res.render("users/user-profile",{upload:user});
    })
    .catch((err)=> {
      res.send('err');
    })
});

app.post("/users/user-profile", (req,res)=>{
  const {firstName, lastName,  email, dateOfBirth, address, occupation, hobbies} = req.body;

  let user = new User({firstName, lastName,  email, dateOfBirth, address, occupation, hobbies});

  User
    .create(req.session.currentUser._id)
    .then((userData)=>{
      res.redirect ('/users/user-profile');
    })
    .catch(err=>{
      console.log('error while saving a goal', err);
    })
})

module.exports = app;
