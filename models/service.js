var mongoose = require("mongoose");

var ServiceSchema = new mongoose.Schema({
    title: String,
    desc: String,
    img: String,
    price: Number
});

module.exports = mongoose.model("Service", ServiceSchema);