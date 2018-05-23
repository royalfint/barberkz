var express = require("express"),
    help    = require("./help"),
    app     = express.Router();
    
var Master  = require("../models/master");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/service", function(req, res) {
    
});

module.exports = app;