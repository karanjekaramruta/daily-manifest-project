const express = require("express");
const app = express();
const User = require("../../models/user");
var bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({
  dest: "./public/uploads"
});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get("/users/user-profile/", (req, res,next) => {

  User.findById(req.session.currentUser._id)
    .then((user) => {
      res.render("users/user-profile", {
        upload: user
      });
    })
    .catch((err) => {
      next(err);
    });
});

app.post("/users/user-profile", upload.single("profilePicture"), (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    address,
    occupation,
    hobbies,
    profilePicture,
  } = req.body;

  let user = new User({
    firstName,
    lastName,
    email,
    dateOfBirth,
    address,
    occupation,
    hobbies,
  });

  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    address: req.body.address,
    hobbies: req.body.hobbies,
    occupation: req.body.occupation,
    profilePicture: {
      id: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      originalFileName: req.file.originalFileName,
    },
  };


  User.findByIdAndUpdate(req.session.currentUser._id, newUser)
    .then((userData) => {
      res.redirect("/users/overview");
    })
    .catch((err) => {
      console.log("error while updating user profile", err);
      next(err);
    });
});

app.post("/upload", upload.single("profilePicture"), (req, res, next) => {
  User.findByIdAndUpdate(req.session.currentUser._id, {
      profilePicture: req.file.filename,
    })
    .then((user) => {
      res.redirect("/users/user-profile");
    })
    .catch((err) => {
      console.log("Error with uploading profile picture", err);
      next(err);
    });
});

module.exports = app;