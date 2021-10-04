const mongoose = require("mongoose");
var schema = mongoose.Schema({
    productName: String,
    cost: String
},{versionKey:false});
var productModel = mongoose.model("product",schema);
module.exports = productModel;