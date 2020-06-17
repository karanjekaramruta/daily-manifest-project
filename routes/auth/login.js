const express = require('express');
const app = express();
const User = require('../../models/user');
const bcrypt = require('bcrypt');

app.get('/login', (req,res)=> {
    let data = {
        layout: 'layout-no-nav'
    }
    res.render('auth/login', data)
});

app.post('/login', (req,res, next)=> {

    if (req.body.email === '' || req.body.password === '') {
        res.render('auth/login', {
          errorMessage: 'Please enter both, username and email to log in.',
        });
        return;
    }


     User
        .findOne({email: req.body.email})
        .then((user)=> {
            
            if(!user) {
                res.render('auth/login', {
                    errorMessage: 'The user does not exist.'
                });

                return;
            } 

            bcrypt.compare(req.body.password, user.password, function(err, match) {
                if(match) {
                    req.session.currentUser = user;
                    res.redirect('/users/overview');
                } else {
                    res.render('auth/login', {
                        errorMessage : 'Incorrect credentials.'
                    });
                }
            });
            
        })
        .catch((err)=> { console.log('Err', err) })
})

module.exports = app;