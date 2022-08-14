const Joi = require('joi');

module.exports = Joi.object({
    userId: Joi.number().integer().required(),
    sellerId: Joi.number().integer().required(),
    totalPrice: Joi.number().required(),
    deliveryAddress: Joi.string().required(),
    deliveryNumber: Joi.string().required(),
    products: Joi.array().required(),
});
