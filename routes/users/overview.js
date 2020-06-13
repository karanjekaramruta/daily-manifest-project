const express = require("express");
const app = express();
const User = require('../../models/user');
const axios = require('axios').default;

// axios({
//   method: "get",
//   url: "/quotes",
//   baseURL: "https://type.fit/api",
//   transformResponse: [function (data) {
//     // Do whatever you want to transform the data
 
//     return data;
//   }],
// })
//   .then(function (response) {
//     response.data.text()
//   });

app.get('/users/overview', (req, res) => res.render('users/overview'));

module.exports = app;