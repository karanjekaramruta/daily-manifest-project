const express = require("express");
const app = express();
const User = require('../../models/user');
const axios = require('axios').default;

axios({
  method: "get",
  url: "/quotes",
  baseURL: "https://type.fit/api"
})
  .then(function (response) {
    response.data.text()
  });

app.get('/users/overview', (req, res) => res.render('users/overview'));

module.exports = app;