const Joi = require('joi');

const signUpValidation = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().required() ,
        lastName: Joi.string().required() ,
        businessName: Joi.string().required() ,
        phoneNo: Joi.number().min(6).required() ,
        email: Joi.string().min(6).required().email() ,
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().min(6).required() 
    }).unknown();
        return schema.validate(user);
    }

const signInValidation = (user) => {
        const schema = Joi.object({
            email: Joi.string().min(6).required().email() ,
            password: Joi.string().min(6).required() 
        }).unknown();
            return schema.validate(user);
        }


const changePasswordValidation = (user) => {
        const schema = Joi.object({
            newPassword: Joi.string().min(6).required() ,
            oldPassword: Joi.string().min(6).required() 
        }).unknown();
            return schema.validate(user);
        }
        

    
module.exports = {
    signUpValidation,
    signInValidation,
    changePasswordValidation
}