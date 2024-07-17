import Joi from "joi";

const registerSchema = Joi.object({
  firstname: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "กรุณากรอกชื่อ" }),
  lastname: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "กรุณากรอกนามสกุล" }),
  phonenumber: Joi.string()
    .required()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.empty": "กรุณากรอกเบอร์โทร",
      "string.pattern.base": "กรอกเบอร์โทรไม่ครบ 10 หลัก กรุณากรอกอีกครั้ง",
    }),
  email: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "กรุณากรอกอีเมล" }),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
      "string.empty": "กรุณากรอกรหัสผ่าน",
      "string.pattern.base": "กรุณากรอกรหัสผ่าน 6 หลัก",
    }),
  confirmpassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "ยืนยันรหัสผ่าน",
    "any.only": "รหัสผ่านที่ยืนยันไม่ตรงกัน กรุณากรอกอีกครั้ง",
  }),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    console.dir(error);
    return result;
  }
};

export default validateRegister;

("alternatives.match");
