// 14-06-67 เช็คไอดีที่ล็อกอินเข้ามาว่าเป็น user หรือ admin ใช้ปัจจุบัน
const prisma = require("../models/prisma");

const checkUserRole = async (req, res, next) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  });

  if (!user) {
    return res.status(401).json({ message: "ไม่พบผู้ใช้งาน" });
  }

  req.isAdmin = user.isAdmin;
  next();
};

module.exports = checkUserRole;

// ----------------------------------------
// ทดสอบ
// const prisma = require("../models/prisma");

// const checkUserRole = async (req, res, next) => {
//   const userId = req.user.id;
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//     select: { isAdmin: true },
//   });

//   if (!user) {
//     return res.status(401).json({ message: "ไม่พบผู้ใช้" });
//   }

//   if (!user.isAdmin) {
//     return res.status(403).json({ message: "ไม่มีสิทธิ์เข้าถึง" });
//   }

//   next();
// };

// module.exports = checkUserRole;
