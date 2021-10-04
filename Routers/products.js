var express = require("express");
var mongoose = require("mongoose");
var productModel = require("../models/product.model");
var router = express.Router();


/* Get the all data from mongodb ugenthar  with mongoose library + express */
router.get("/",(req,res,next)=>{
    productModel.find(function(err,response){
        if(err) res.json({message:"error",error:err});
        else if(response===null) res.json({message:"No Product found"});
        else res.json({message:"All the Products",products:response});
    })
});

/* Get the all data from mongodb ugenthar  based on name with mongoose library + express */
router.get("/searchbyname",(req,res,next)=>{
    productModel.find({productName:req.query.name},function(err,productsfetched){
        if(err) res.json({message:"error",error:err});
        else if(response===null) res.json({message:"No Product found"});
        else res.json({message:"Product Found by name "+req.query.name,products:productsfetched});
    })
});

/* Get the all data from mongodb ugenthar  based on _id with mongoose library + express */
router.get("/searchbyid",(req,res,next)=>{
    productModel.findById({_id:req.query._id},function(err,response){
        if(err) res.json({message:"error",error:err});
        else if(response===null) res.json({message:"No Product found"});
        else res.json({message:"Product Found By id"+req.query._id,products:productsfetched});
    })
});


router.get("/product-details/:id([0-9]{4})",(req,res)=>{
    res.send("Product Details of "+req.params.id);
});

/* Post the data to mongodb ugenthar with mongoose library + express */

router.post("/add_product",(req,res)=>{
    //use app.use(express.json()) to get output from req as json 
    var new_product = new productModel({  
        productName : req.body.productName,
        cost : req.body.cost    
    });
    new_product.save(function(err,new_product){
        if(err) res.json({message:"error",error:err});
        else res.json({message:"Product Added successfully ","product_added_details":req.body});
    });
});
/* Put (update by id) mongodb ugenthar with mongoose library + express */
router.put("/update_product",(req,res)=>{
    productModel.updateMany({"_id":req.query._id},{$set:{"cost":"1000$"}},(err,response)=>{
        if(err) res.json({message:"error product not found to update",error:err});
        else if(response===null) res.json({message:"No Product found"});
        else res.json({message:"product updated successfully",response:response});
    });
})
/* Delete (delete by id) data from mongodb ugenthar with mongoose library + express */
router.delete("/delete_product",(req,res)=>{
    productModel.findByIdAndDelete(req.query._id,(err,response)=>{
        if(err) res.json({message:"error",error:err})
        else if(response===null) res.json({message:"No Product found"});
        else res.json({message:"product deleted successfully",response:response});
    })
})




module.exports = router;
