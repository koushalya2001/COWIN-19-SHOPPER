const mongoose = require('mongoose')
var express = require('express');
const app = express();
var config = require('./config/config.json');
var routes  = require("./routes/userregroutes");
var shoper=require('./handlers/createshop')
var key=process.env.qjkktzyut;
var swig = require("swig");
var bodyParser = require('body-parser');
const path=require('path');
const dotenv=require('dotenv').config();
const cors=require('cors');
var mongoHost = config.db.dev.hosttrial;
mongoose.connect(mongoHost,{ useNewUrlParser: true ,useUnifiedTopology: true});
var SHOP1=process.env.shop1;
// Pass the global passport object into the configuration function
/*require('./config/passport')(passport);*/

// This will initialize the passport object on every request
//app.use(passport.initialize());
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//CSRF PROTECTION
var pprt = require('csurf');
pprtpt=pprt();
var SHOP2=process.env.SHOP2
app.get('/', function(req, res, next){
  res.render('index');
});
//SEESION HANDLING
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
//require('./utils/passport');
var MongoStore = require('connect-mongo')(session);
app.use(cookieParser({secret:key}));
app.use(session({
     secret: SHOP1,
     name:"kureukergujgrbjrhgjyetr87w6r8687tdgew87628",
     resave: false,
     saveUninitialized: false,
     rolling:false,
     cookie:{secret:SHOP2},
     store: new MongoStore({ mongooseConnection: mongoose.connection,
      collection:'SESSIONS'
    })
}));
app.use(function(req, res, next) {
   req.session.cookie.maxAge = 180 * 60 * 1000; // 3 hours
    req.session.cookie.sameSite=true;
    req.session.cookie.secure=true;
    req.session.cookie.httpOnly=true;
    req.session.cookie.path='/';

    next();
});
app.use(passport.initialize());
/*
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});*/
//SESSION HANDLING DONE

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));
app.use(pprtpt);

routes(app);
shoper(app);
//createshop(app);
app.listen(config.PORT, () => {
    console.log('ok serving at..  ' + config.PORT);
});
