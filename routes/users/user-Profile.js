const express = require("express");
const app = express();
const User = require("../../models/user");
var bodyParser = require("body-parser");
const multer  = require('multer');
const upload = multer({ dest: '../../public/images' });



app.use(bodyParser.urlencoded({ extended: false }));

app.get("/users/user-profile/", (req, res) => {
//console.log(req.session.currentUser._id)deb

  User.findById(req.session.currentUser._id)
    
  
  .then((user) =>{  
/*
    let theDate = new Date(user.dateOfBirth);
    let YYYMMDD = `${theDate.getDate()}/${theDate.getMonth()+1}/${theDate.getFullYear()}`;
    user.dateOfBirth = YYYMMDD;*/
    console.log(user.dateOfBirth);
      res.render("users/user-profile",{upload:user});
    })
    .catch((err)=> {
      res.send('err');
    })
});

app.post("/users/user-profile", (req,res)=>{
  const {firstName, lastName,  email, dateOfBirth, address, occupation, hobbies} = req.body;
  let user = new User({firstName, lastName,  email, dateOfBirth, address, occupation, hobbies});
  console.log(req.session.currentUser._id);
  User
    .findByIdAndUpdate(req.session.currentUser._id,{firstName, lastName,  email, dateOfBirth, address, occupation, hobbies})
    .then((userData)=>{
      

      res.redirect ('/users/user-profile');
    })
    .catch(err=>{
      console.log('error while saving a goal', err);
    })
})


/*app.get('/dummy', (req, res, next) => {
  res.render('dummy'); 
});*/

app.post('/upload', upload.single('profilePicture'), (req, res, next) => {
 
  User
  .findByIdAndUpdate(req.session.currentUser._id, {profilePicture: req.file.filename})
  .then((user) => {
    res.redirect("/users/user-profile")
  })
  .catch((err) => {
    console.log("Error with uploading profile picture", err)
  })

})





module.exports = app;
