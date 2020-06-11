const express = require("express");
const app = express();
const User = require('../../models/user');
const bcrypt = require('bcrypt');

app.get("/login", (req,res)=> { res.render("auth/login") })

app.post("/login", (req,res, next)=> {
    User.findOne({
        email: req.body.email
    })
    .then((user)=> {
        if(!user) {
            res.redirect("/auth/login?error=incorrect+credentials");
        } else {
            bcrypt.compare(req.body.password, user.password, function(err, match) {
                if(err){
                    console.log("Error", err);
                } else if(match) {
                    req.session.user = user;
                    res.redirect("/");
                    
                } else {
                    res.redirect("/auth/login?error=incorrect+credentials");
                }
            });
    }})
    .catch((err)=> { console.log("Err", err) })
})

module.exports = app;