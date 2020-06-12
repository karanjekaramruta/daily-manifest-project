require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const multer       = require('multer');
// Set up the database

require('./configs/db.config');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// default value for title local
app.locals.title = 'Goal Tracker';

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup


app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/goals/partials');
hbs.registerPartials(__dirname + '/views/tasks/partials');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Session
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);

app.use((req,res,next) => {
  if(req.session.currentUser) {
      res.locals.loggedIn = true;
      res.locals.user = req.session.currentUser;    
   }
   next();
})

// Registering routes
const index = require('./routes/index');
const createGoal = require('./routes/goals/create');
app.use('/', index);
app.use("/", require("./routes/auth/signup"));
app.use("/", require("./routes/auth/login"));

function protectPath(req,res,next){
  if(req.session.currentUser) {
    next();
  }
  else{
    res.redirect("/auth/login");
  }
}
app.use('/', createGoal);
app.use("/", protectPath, require("./routes/users/overview"));
app.use("/", protectPath, require("./routes/goals/myGoals"));
app.use("/", protectPath, require("./routes/tasks/create"));
app.use("/", protectPath, require("./routes/users/user-Profile"));
app.use("/", protectPath, require('./routes/auth/logout'));


app.listen(process.env.PORT, ()=>{
  console.log("app listening")
})

module.exports = app;