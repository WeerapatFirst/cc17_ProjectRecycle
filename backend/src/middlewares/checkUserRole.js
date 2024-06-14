// 14-06-67 เช็คไอดีที่ล็อกอินเข้ามาว่าเป็น user หรือ admin

const prisma = require("../models/prisma");

const checkUserRole = async (req, res, next) => {
  const userId = req.user.id; // สมมุติว่า userId ถูกเก็บใน req.user.id
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  req.isAdmin = user.isAdmin;
  next();
};

module.exports = checkUserRole;
