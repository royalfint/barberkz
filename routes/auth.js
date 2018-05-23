var express  = require("express"),
    passport = require("passport"),
    app      = express.Router();
    
var Master   = require("../models/master"),
    help     = require("./help");

// SINGUP ROUTES *****

app.get("/signup", function(req, res) {
    res.render("signup");
});

app.post("/signup", function(req, res) {
    var username = req.body.username.trim().toLocaleLowerCase();
    var password = req.body.password.trim();
    
    //TODO check for validity
    if(!help.validateEmail(username)) {
        req.flash("error", "Введите правильный E-mail!");
        return res.redirect("back");
    }
    
    if(password && password.length < 6) {
        req.flash("error", "Пароль должен быть длиннее 6 символов!");
        return res.redirect("back");
    }
    
    Master.register(new Master({username: username}), password, function(err, master) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/signup");
        }
        
        master.status = 0;
        master.name = "Мастер";
        master.save();
        
        res.redirect("/signedup");
    });
});

app.get("/signedup", function(req, res) {
   res.render("signedup"); 
});

//SIGNIN ROUTES ********

app.get("/signin", function(req, res) {
   res.render("signin", { login_errors: req.session.messages, req: req});
});

app.post("/signin", help.tolowercase, passport.authenticate("local", {
        successRedirect: "/profile",
        failureRedirect: "/signin",
        failureMessage: "Неверный логин или пароль"
    }), function(req, res){
});

module.exports = app;