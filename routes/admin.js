var express = require("express"),
    help    = require("./help"),
    flash   = require("connect-flash"),
    app     = express.Router();
    
var Master  = require("../models/master"),
    Service = require("../models/service");

app.get("/profile", help.isLoggedIn, function(req, res) {
    Master.findById(req.user.id, function(err, profile) {
        if(err) console.log(err);
        
        res.render("profile", {profile: profile});
    });
});

app.get("/schedule", help.isLoggedIn, function(req, res) {
    Master.findById(req.user.id, function(err, profile) {
        if(err) console.log(err);
        
        res.render("schedule", {profile: profile});
    });
});

app.get("/shedule/start", help.isLoggedIn, function(req, res) {
   Master.findById(req.user.id, function(err, profile) {
        if(err) console.log(err);
        
        
   });
});

app.get("/services", help.isLoggedIn, function(req, res) {
    Service.find({}, function(err, services) {
        if(err) console.log(err);
        
        res.render("services", {services: services});
    });
});

app.get("/services-add", help.isLoggedIn, function(req, res) {
    res.render("addservices");
});

app.post("/services-add", help.isLoggedIn, function(req, res) {
    
    if(!req.body.title || req.body.title.length == 0) {
        req.flash("error", "Введите название!");
        return res.redirect("/services-add");
    }
    
    Service.create({
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        price: req.body.price
    }, function(err, newService) {
       if (err) console.log(err);
    });
});

module.exports = app;