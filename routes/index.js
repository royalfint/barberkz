var express = require("express"),
    app = express.Router();
    
app.get("/", function(req, res) {
    res.render("landing");
});

module.exports = app;