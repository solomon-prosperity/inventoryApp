const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {
    signUpValidation,
    signInValidation
} = require('../validations/Uservalidation')

const signUp = async (req , res) => {

//  validating user input
    const {error} = signUpValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

// checking if password and confirmPassword matches
    const {password, confirmPassword} = req.body
    if (password !== confirmPassword) return res.status(400).send(`password mismatch!`)

// checking if the email already exists
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send(`Email already exists`)

// hashing password
    const hashedPassword= await bcrypt.hash(req.body.password , 12)

    const image = req.file == undefined ? 'No Image Uploaded' :
    `http://localhost:5000/productImage/${req.file.filename}`


// saving user details to database and returning saved details except password
    const user = new User({ ...req.body , 
        password: hashedPassword , avatar: image})
    try {
            const savedUser = await user.save();
             res.status(200).json({
                 success: true,
                 msg: `Account successfully created` ,
                 data: {
                    id: savedUser._id,
                    firstName: savedUser.firstName,
                    lastName: savedUser.lastName,
                    businessName: savedUser.businessName,
                    email: savedUser.email,
                    phoneNo: savedUser.phoneNo,
                    avatar: savedUser.avatar
                 }
                })
    } catch (err) {
            res.status(400).send(err)
    }
} 

const signIn = async (req , res ) => {

// validating user input using joi
try {
    const {error} = signInValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

// checking if the user is registered
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).json(`your email or password is incorrect`)

// verifying user password with the one in our database
    const validPass = await bcrypt.compare(req.body.password , user.password) 
    if (!validPass) return res.status(200).json(`your email or password is incorrect`)

//  generating jwt token
    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET);

// sending the user details and saving token as cookie on successful signin
    res.cookie('auth_token' , token).json({
        success: true , 
        msg: `you were successfully logged in`,
        data: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            businessName: user.businessName,
            email: user.email,
            phoneNo: user.phoneNo,
            avatar: user.avatar
        }
    })
}
    catch (err) {
        res.status(400).send(err)
    }
}

const updateInfo = async (req , res ) => {

/* checking if the logged in user is actually the one trying to update info, to prevent other users who may have access
 to another user's ID from doing so*/
    let userid= req.user._id
    if (userid !== req.params.id) return res.status(400).json({ success: false , msg: `you cannot update this user's info`})

// finding and updating user info and also returning updated user info
    try {
    const user = await User.findOneAndUpdate({_id:req.params.id },
            { ...req.body} , {new: true})
        const updatedUser = await user.save();
        res.status(200).json({
            success: true , 
            msg: `your details have been updated successfully` , 
            data: {
            id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            businessName: updatedUser.businessName,
            email: updatedUser.email,
            phoneNo: updatedUser.phoneNo,
            avatar: `http://localhost:5000/avatar/${req.file.filename}`
        }
        })
    } catch (err) {
        res.status(400).send(err)
    }
 }

const changePassword = async (req , res) => {

/* checking if the logged in user is actually the one trying to change password, to prevent other users who may have access
 to another user's ID from changing password */

    let userid = req.user._id
    if (userid !== req.params.id ) return res.status(400).json({ success: false , msg: `you cannot change this user's password`})

// finding and changing user password and also hashing new password 
    try {
    const hashedPassword = await bcrypt.hash(req.body.newPassword , 12);
    const user = await User.findOneAndUpdate({_id: req.params.id},
        {password: hashedPassword} , {new: true})
        await user.save();
    res.status(200).json({
        success: true , 
        msg: `your password was successfully changed!` , 
    })
    } catch (err) {
        res.status(400).send(err)
    }
    
}

const deleteAccount = async (req , res) => {

/* checking if the logged in user is actually the one trying to delete account, to prevent other users who may have access
 to another user's ID from deleting account */

    let userid = req.user._id
    if (userid !== req.params.id) return res.status(400).json({ success: false , msg: `you cannot delete this user's account`})

//  finding and deleting user account
    try {
    const user =  await User.findOneAndDelete({_id: req.params.id})
    res.status(200).json({
        success: true , 
        msg: `The User account with id: ${req.params.id} was successfully deleted` , 
    })
    } catch (error) {
        res.status(400).json({
            success: false , 
            msg: error , 
        })
    }
}

// clears current user's token data and logs them out
const signOut = (req, res) => {
    return res
      .clearCookie("auth_token")
      .status(200)
      .json({ msg: "You have Successfully logged out!" });
  };


module.exports = {
    signIn, 
    signUp,
    updateInfo,
    changePassword,
    deleteAccount,
    signOut
}