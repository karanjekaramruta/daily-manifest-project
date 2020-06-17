const express = require('express');
const app = express();

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

module.exports = app;