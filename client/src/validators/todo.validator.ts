import Joi from "joi";

const todoValidator = Joi.object({
    title: Joi.string().min(3).max(20).required().messages({
        'string.min': 'Title minimum length is 3 characters',
        'string.max': 'Title maximum length is 20 characters',
        'string.empty': 'Title field is required'
    }),
    description: Joi.string().min(3).max(50).required().messages({
        'string.min': 'Description minimum length is 3 characters',
        'string.max': 'Description maximum length is 50 characters',
        'string.empty': 'Description field is required'
    }),
})

export {
    todoValidator
}
