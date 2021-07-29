const Product = require ('../models/products');
const productValidation = require('../validations/productValidation')

const createProduct = async (req , res) => {

// validating user input using joi
    const {error} = productValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

// saving new product to database and returning the saved product details
    const product = new Product({...req.body , 
        user: req.user._id , 
        productImage: `http://localhost:5000/productImage/${req.file.filename}`})
    try {
          const savedProduct = await product.save();
           res.status(200).json({
               success: true,
               msg: `Product was successfully created` ,
               data: savedProduct
              })
    } catch (err) {
          res.status(400).send(err)
          
    }
}

// getUserProducts allows signed in user to fetch the product they posted from the database
const getUserProducts = async (req , res) => {
    const userid = req.user._id
    try {
     const userProducts = await Product.find({user: userid});
     res.status(200).json({
        success: true,
        msg: `Your Products are listed below` ,
        data: userProducts
       })
    } catch (err) {
        res.status(400).json({ success: false , data: err})
    }
}

// getSingleProduct allows signed in user to fetch only a single product from the products they posted in the database 
const getSingleProduct = async (req ,res) => {
        let userid = req.user._id
    try {
         const singleProduct = await Product.findOne({user: userid , _id : req.params.id});
        if (singleProduct) { 
         res.status(200).json({
            success: true,
            data: singleProduct
           })
        } else {
            res.status(400).json({
                success: false ,
                msg: `product not found`
            })
        }
    } catch (err) {

    }
}

// updateProduct allows signed in user to update their product details in the database
const updateProduct = async (req , res) => {
    let userid = req.user._id

    try {
        const product = await Product.findOneAndUpdate({user: userid , _id: req.params.id},
            {...req.body ,
             productImage: `http://localhost:5000/productImage/${req.file.filename}`} , 
            {new: true})
            if (!product) return res.status(400).json({ success: false , msg: `product not found`})
            const updatedProduct = await product.save()
            res.status(200).json({
                success: true , 
                msg: `your product details have been updated successfully` , 
                data: updatedProduct
            })
    } catch (err) {
            res.status(400).send(err)
        }

}

// deleteProduct allows signed in user to their products from the database

const deleteProduct = async (req , res) => {
    let userid = req.user._id
    try {
    const product =  await Product.findOneAndDelete({user: userid , _id: req.params.id})
    if (!product) return res.status(400).json({ success: false , msg: `product not found`})
    res.status(200).json({
        success: true , 
        msg: `The product with id ${req.params.id} was successfully deleted` , 
    })
    } catch (error) {
        res.status(400).json({
            success: false , 
            msg: error , 
        })
    }
}

// Note: req.user._id grabs the logged in user's ID anytime the user accesses a protected route, this is possible from the middleware

module.exports = {
    createProduct,
    getUserProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}