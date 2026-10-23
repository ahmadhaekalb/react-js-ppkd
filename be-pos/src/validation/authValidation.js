import Joi from "joi";

export const loginSchema = Joi.object({
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