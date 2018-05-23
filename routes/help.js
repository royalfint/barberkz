var Master = require("../models/master");

var help = {};

help.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()){
        Master.findById(req.user.id, function(err, user){
          if(err) console.log(err); 
           
          if(user.status == 9){
            res.locals.level = 9;
          } else {
            res.locals.level = 0;
          }
          next();
        });
    } else {
        req.flash("error", "Сначала нужно войти!");
        res.redirect("/signin");
    }
};

help.validateEmail = function (email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

help.tolowercase = function(req, res, next){
    req.body.username = req.body.username.toLowerCase();
    req.body.username.trim();
    next();
};

module.exports = help;
