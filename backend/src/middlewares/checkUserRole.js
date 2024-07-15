// 17-06-67 เช็คว่าเป็น admin หรือไม่
const createError = require("../utils/create-error");

const checkUserRole = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "ไม่สามารถเข้าถึงได้" });
  }
};

module.exports = checkUserRole;

// ******************************
// const checkUserRole = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     return res.redirect("/"); // เปลี่ยนเส้นทางไปที่หน้าหลัก
//   }
// };

// module.exports = checkUserRole;

// 14-06-67 เช็คไอดีที่ล็อกอินเข้ามาว่าเป็น user หรือ admin ใช้ปัจจุบัน
// const prisma = require("../models/prisma");

// const checkUserRole = async (req, res, next) => {
//   const userId = req.user.id;
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//     select: { isAdmin: true },
//   });

//   if (!user) {
//     return res.status(401).json({ message: "ไม่พบผู้ใช้งาน" });
//   }

//   if (!user.isAdmin) {
//     return res.status(403).json({ message: "ไม่มีสิทธิ์เข้าถึงหน้านี้" });
//   }

//   req.isAdmin = user.isAdmin;
//   next();
// };

// module.exports = checkUserRole;

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
