import Joi from "joi";

// CREATE
export const createSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email format must contain @',
    'string.required': 'Email is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Minimun password length is 8 characters',
    'string.required': 'Password is required',
  }),
});

// UPDATE
export const updateSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email format must contain @',
    'string.required': 'Email is required',
  }),
  password: Joi.string().min(8).optional().required().messages({
    'string.min': 'Minimun password length is 8 characters',
  }),
});