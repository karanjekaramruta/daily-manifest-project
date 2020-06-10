const express = require("express");
const app = express();
const User = require('../../models/user');
const bcrypt = require('bcrypt');

app.post("/login", (req,res, next)=> {
    User.findOne({
        email: req.body.email
    })
    .then((user)=> {
        if(!user) {
            res.redirect("/auth/login?error=incorrect+credentials");
        } else {
            bcrypt.compare(req.body.passwordHash, user.passwordHash, function(err, match) {
                if(err){
                    console.log("Error", err);
                } else if(match) {
                    req.session.user = user;
                    if(req.query.redirectUrl) res.redirect(req.query.redirectUrl);
                    else res.redirect("/");
                    
                } else {
                    res.redirect("/auth/login?error=incorrect+credentials");
                }
            });
    }})
    .catch((err)=> { console.log("Err", err) })
})

app.get("/login", (req,res)=> {
    if(req.query.error) {
        res.render("auth/login", {
            message: req.query.error, 
            error: true,
            redirectUrl: req.query.redirectUrl
        });
    } else {
        res.render("auth/login", { redirectUrl: req.query.redirectUrl});
    }
})

module.exports = app;