const Joi = require('joi');
const { password } = require("./custom.validation");

const register = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }).required(),
    password: Joi.string().custom(password, "Bad password").required(),
    name: Joi.string().required()
})

const login = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().custom(password).required()
});



module.exports = {
    register,
    login,

}