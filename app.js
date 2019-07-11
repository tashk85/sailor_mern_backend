const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const mongoose = require('mongoose');
const methodOverride = require("method-override"); //let PUT & PATCH method override GET
const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(methodOverride('_method', { methods: ['POST', 'GET']}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(morgan("combined"));

app.use(require("./routes"));

app.use(express.static("public"));

// app.use(require("./middleware/error_handler_middleware"));

module.exports = app;