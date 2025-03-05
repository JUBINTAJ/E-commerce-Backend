import Joi from "joi";

export const productValidation=Joi.object({
    _id:Joi.string().optional(),
    name:Joi.string().min(3).max(50).required(),
    price:Joi.number().Positive().required(),
    quantity:Joi.number().integer().min(0).required(),
    url:Joi.string().url().optional(),
    description:Joi.string().min(10).max(600).required(),
    category:Joi.string().min(3).max(50).required(),
    isDelete:Joi.boolean().default(false)


})