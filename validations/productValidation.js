const Joi = require('joi');

const productValidation = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required() ,
        desc: Joi.string().min(2).required() ,
        noInStock: Joi.number().required() ,
        price: Joi.number().required() ,
        productImage: Joi.string().required()  
    }).unknown();
        return schema.validate(user);
    }


module.exports= productValidation