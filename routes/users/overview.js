const express = require("express");
const app = express();
const User = require('../../models/user');

app.get('/users/overview', (req, res) => res.render('users/overview'));

module.exports = app;