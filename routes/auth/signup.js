const express = require("express");
const app = express();
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.get('/signup', (req, res) => res.render('auth/signup'));

app.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.passwordHash, saltRounds, function(err, hash) {
            User
                .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                passwordHash: req.body.passwordHash
                })
                .then((user)=> { res.redirect("/login") })
                .catch(err => { console.log("Error", err) });
    })
});

module.exports = app