var express = require("express");
var mongoose = require("mongoose")
var prop = require("./env/properties")
var app = express();
mongoose.connect(prop.URL)
mongoose.connection.on('connected',()=>{
    console.log("Mongoose is connected to mongodb!");
})
mongoose.connection.on('disconnected',()=>{
    console.log("Mongoose is dis-connected to mongodb!");
})
var products = require("./Routers/products");
app.use(express.json());
app.use("/products",products);

app.listen(3000);