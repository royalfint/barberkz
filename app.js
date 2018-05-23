var express       = require('express'),
    app           = express(),
    mongoose      = require('mongoose'),
    passport      = require("passport"),
    flash         = require("connect-flash"),
    passportLocal = require("passport-local"),
    bodyParser    = require("body-parser");
    
var Master        = require("./models/master");

mongoose.connect("mongodb://barber:YtEpyftimVjq1Gfhjkm@ds011389.mlab.com:11389/barberkz");
    
var indexRoutes = require("./routes/index"),
    adminRoutes = require("./routes/admin"),
    authRoutes  = require("./routes/auth");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(require("express-session")({
    secret: "Rusty wins the cutest dog contest!",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.level = 0;
   res.locals.success = req.flash("success");
   next();
});
passport.use(new passportLocal(Master.authenticate()));
passport.serializeUser(Master.serializeUser());
passport.deserializeUser(Master.deserializeUser());

app.use(indexRoutes);
app.use(authRoutes);
app.use(adminRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});