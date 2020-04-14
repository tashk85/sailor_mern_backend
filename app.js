const express = require("express");
const morgan = require("morgan");
const expressSession = require("express-session");
const MongoStore = require('connect-mongo')(expressSession);
const mongoose = require("mongoose");
const methodOverride = require("method-override"); //let PUT & PATCH method override GET
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();


app.use(cors());

app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(methodOverride('_method', { methods: ['POST', 'GET']}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use(morgan("combined"));

app.use(require("./routes"));

app.use(express.static("public"));

app.use(require("./middleware/error_middleware"));

require("./services/rss_cron");

require("./services/seed_service");

module.exports = app;