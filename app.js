var express               = require('express'),
    app                   = express(),
    mongoose              = require('mongoose'),
    bodyParser            = require("body-parser");
    
var indexRoutes = require("./routes/index");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(indexRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});