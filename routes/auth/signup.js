const express = require('express');
const app = express();
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.get('/signup', (req, res) => {
    let data = {
        layout: 'layout-no-nav'
    }
    res.render('auth/signup', data)
});

app.post('/signup', (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;

    if(email === '' || password === ''){
        res.render('auth/signup', {
            errorMessage: 'All fields are required to signup.'
        });
        return;
    }

    User.findOne({email:email})
        .then((user)=>{

            if(user){
                res.render('auth/signup', {
                    errorMessage: 'Email already exists, please choose another one.'
                });    
            }
            else{
                
                bcrypt.hash(password, saltRounds, function (err, hash) {

                    if(!err){
                        User.create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash,

                        })
                        .then((user) => {
                            res.redirect('/login');
                        })
                        .catch((err) => {
                            console.log('Error', err);
                        });
                    }
                    else{
                        errorMessage: 'An error occured while creating your account. Please try again later.';
                    }

                });
            }

        })
});

module.exports = app;
