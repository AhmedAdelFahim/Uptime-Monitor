import Joi from "joi";

export const signUp = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "password is required"
  }),
  password: Joi.string().required().messages({
    "any.required": "password is required"
  }),
  passwordConfirmation: Joi.ref("password")
}).with('password', 'passwordConfirmation').messages({
  "object.with": "Password Confirmation must be matched with password"
});