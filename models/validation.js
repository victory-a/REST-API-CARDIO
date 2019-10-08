const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema =  Joi.object({
        email : Joi.string().min(6).email().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

module.exports = { registerValidation, loginValidation }