const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String , 
        required: true ,
        min: 2 

    } ,
    desc: {
        type: String , 
        required: true ,
        min: 2 

    } ,
    category: {
        type: String , 
        required: true 

    } ,
    price: {
        type: Number , 
        required: true 

    } ,
    noInStock: {
        type: Number , 
        required: true 

    } ,
    productImage: {
        type: String ,
        required: true  

    } ,
    user: {
        type: mongoose.Types.ObjectId

    } ,
    date: {
        type: Date , 
        default: Date.now
    }
})

let products = mongoose.model('Product' , productSchema)
module.exports = products