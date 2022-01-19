const productModel = require("../model/productModels");

exports.createProduct = async(req,res,next)=>{
    const newProduct = await productModel.create({...req.body , userID:req.user._id});

    res.status(200).json({
        status:'success',
        data:newProduct
    })
}

exports.deleteProduct = async(req,res,next)=>{
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status:'success',
        data:deletedProduct
    })
}

exports.modifyProduct = async(req,res,next)=>{
    const modifiedProduct = await productModel.updateOne({_id:req.params.id},{...req.body});

    res.status(200).json({
        status:'success',
        data:modifiedProduct
    })
}

exports.getProduct = async(req,res,next)=>{
    const products = await productModel.find({userID:req.user._id,categoryID:req.params.id});

    res.status(200).json({
        status:'success',
        data:products
    })
}