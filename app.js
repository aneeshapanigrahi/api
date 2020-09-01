const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const cors = require("cors")

const app = express();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use(cors());
// app.use(cors({
//     'allowedHeaders': '*',//['sessionId', 'Content-Type'],
//     'origin': '*',
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
//   }));

//Passport config
require('./config/passport')(passport);

//DB config
const db = require('./config/db').MongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/users', require('./routes/users'));
app.use('/customize', require('./routes/customization'));
app.use('/form', require('./routes/form'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server start running on port ${PORT}`));
