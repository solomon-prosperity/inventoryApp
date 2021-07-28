const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String , 
        required: true ,

    } ,
    lastName: {
        type: String , 
        required: true ,

    } ,
    businessName: {
        type: String , 
        required: true ,
    
    } ,
    phoneNo: {
        type: String , 
        required: true ,
        min: 6 , 
        max: 1024

    } ,
    avatar: {
        type: String , 
        min: 6 , 
        max: 256

    } ,
    email: {
        type: String , 
        required: true ,
        min: 6 , 
        max: 256

    } ,
    password: {
        type: String , 
        required: true ,
        min: 6 , 
        max: 1024

    } ,
    confirmPassword: {
        type: String , 
        min: 6 , 
        max: 1024

    } ,
    date: {
        type: Date , 
        default: Date.now
    }
})

let users = mongoose.model('User' , userSchema)
module.exports = users