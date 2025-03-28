const joi = require('joi');

const registerValidation = (data) => {
    const schema = joi.object({
        username: joi.string()
            .min(3)
            .max(50)
            .required(),
        email: joi.string()
            .email()
            .required(),
        password: joi.string()
            .min(6)
            .required()
    });

    return schema.validate(data);
};

const loginValidation = data => {
    const schema = joi.object({
        login: joi.string()
            .min(3)
            .max(50)
            .required(),
        password: joi.string()
            .min(6)
            .required()
    });

    return schema.validate(data);
};

const taskValidation = data => {
    const schema = joi.object({
        title: joi.string()
            .min(3)
            .max(100)
            .required(),
        description: joi.string()
            .max(500)
            .optional(),
        status: joi.string()
            .valid('todo', 'in-progress', 'done')
            .optional(),
        priority: joi.string()
            .valid('low', 'medium', 'high')
            .optional()
    });

    return schema.validate(data);
}

module.exports = {
    registerValidation,
    loginValidation,
    taskValidation
};