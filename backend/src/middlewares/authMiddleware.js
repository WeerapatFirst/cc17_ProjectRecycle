const jwt = require("jsonwebtoken");
const createError = require("../utils/create-error");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(createError(401, "กรุณาเข้าสู่ระบบ"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(createError(401, "Token ไม่ถูกต้อง"));
  }
};

module.exports = authenticate;
