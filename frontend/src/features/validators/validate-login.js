import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().required().messages({ "string.empty": "กรุณากรอกอีเมล" }),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
      "string.empty": "กรุณากรอกรหัสผ่าน",
      "string.pattern.base": "กรุณากรอกรหัสผ่าน 6 หลัก",
    }),
});

const validateLogin = (input) => {
  const { error } = loginSchema.validate(input, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    console.dir(error);
    return result;
  }
};

export default validateLogin;
