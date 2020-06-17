const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require('mongoose');
const { model } = require("../models/user");

module.exports = app => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60, // 1 day
      }),
    })
  );
};
