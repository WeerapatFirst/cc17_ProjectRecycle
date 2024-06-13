// const Joi = require("joi");

// exports.registerSchema = Joi.object({
//   firstName: Joi.string().required().trim(),
//   lastName: Joi.string().required().trim(),
//   email: Joi.string().required().trim(),
//   password: Joi.string()
//     .required()
//     .pattern(/^[a-zA-Z0-9]{6,}/),
//   phoneNumber: Joi.string()
//     .required()
//     .pattern(/^[0-9]{10}$/),
// });

// exports.loginSchema = Joi.object({
//   email: Joi.string().required(),
//   password: Joi.string().required(),
// });

const Joi = require("joi");

exports.registerSchema = Joi.object({
  firstname: Joi.string().required().trim(),
  lastname: Joi.string().required().trim(),
  email: Joi.string().required().trim(),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}/),
  confirmpassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "ยืนยันรหัสผ่านไม่ถูกต้อง",
  }),
  phonenumber: Joi.string()
    .required()
    .pattern(/^[0-9]{10}$/),
});

exports.loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
