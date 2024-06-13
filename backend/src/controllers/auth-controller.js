const bcrypt = require("bcryptjs");
const userService = require("../services/user-service");
const prisma = require("../models/prisma");
const jwtService = require("../services/jwt-service");
const createError = require("../utils/create-error");
const hashService = require("../services/hash-service");

const authController = {};

// ใช้ปัจจุบัน
// authController.register = async (req, res, next) => {
//   try {
//     const {
//       firstname,
//       lastname,
//       email,
//       phonenumber,
//       password,
//       confirmpassword,
//     } = req.body;

//     const existUser = await prisma.user.findUnique({
//       where: {
//         email: email,
//         phonenumber: phonenumber,
//       },
//     });

//     if (existUser) {
//       return res.status(400).json({
//         message: "ตรวจสอบพบมีการใช้งานซ้ำ อีเมล หรือ เบอร์โทร",
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await prisma.user.create({
//       data: {
//         firstname: firstname,
//         lastname: lastname,
//         email: email,
//         phonenumber: phonenumber,
//         password: hashedPassword,
//         confirmpassword: confirmpassword,
//       },
//     });

//     res.status(201).json({ message: "สำเร็จ" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// ทดสอบ

// ทดสอบ 11/06-67
authController.register = async (req, res, next) => {
  try {
    const data = req.input;
    const existUser = await userService.findEmail(data.email);

    if (existUser) {
      createError({
        message: "ตรวจสอบพบมีการใช้งาน อีเมล ซ้ำ",
        field: "email",
        statusCode: 400,
      });
    }

    data.password = await hashService.hash(data.password);
    await userService.createUser(data);
    res.status(201).json({ message: "สมัครใช้งานสำเร็จ" });
  } catch (error) {
    next(error);
  }
};

authController.login = async (req, res, next) => {
  try {
    const existUesr = await userService.findEmail(req.input.email);

    if (!existUesr) {
      createError({
        message: "ไม่พบอีเมลหรือรหัสผ่านที่กรอกเข้ามา",
        statusCode: 400,
      });
    }

    const isMatch = await hashService.compare(
      req.input.password,
      existUesr.password
    );

    if (!isMatch) {
      createError({
        message: "ไม่พบอีเมลหรือรหัสผ่านที่กรอกเข้ามา",
        statusCode: 400,
      });
    }

    const accessToken = jwtService.sign({ id: existUesr.id });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

authController.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

// ใช้ปัจจุบัน
// authController.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const targetUser = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (!targetUser) {
//       return res
//         .status(400)
//         .json({ message: "ไม่พบอีเมลหรือรหัสผ่านที่กรอกเข้ามา" });
//     }

//     const isMatch = await bcrypt.compare(password, targetUser.password);

//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ message: "ไม่พบอีเมลหรือรหัสผ่านที่กรอกเข้ามา" });
//     }

//     res.status(200).json({ message: "ล็อกอินสำเร็จ" });
//   } catch (error) {}
// };

module.exports = authController;

// -----------------------------------------
// ใช้ล่าสุด
// authController.register = async (req, res, next) => {
//   try {
//     const {
//       firstname,
//       lastname,
//       email,
//       phonenumber,
//       password,
//       confirmpassword,
//     } = req.body;

//     // ตรวจสอบรหัสผ่าน
//     if (password !== confirmpassword) {
//       return res.status(400).json({ error: "รหัสผ่านไม่ตรงกัน" });
//     }

//     // แฮชรหัสผ่าน
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await userService.createUser({
//       firstname,
//       lastname,
//       email,
//       phonenumber,
//       password: hashedPassword, // บันทึกรหัสผ่านที่แฮชแล้ว
//     });

//     console.log("สมัครใช้งานสำเร็จ:", newUser);

//     res.status(201).json({ message: "สมัครใช้งานสำเร็จ" });

//   } catch (error) {
//     console.error("สมัครไม่สำเร็จ:", error);
//     next(error);
//   }
// };

// -------------------------------

// ใช้ล่าสุด
// authController.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userService.findEmail(email);
//     if (user) {
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (isMatch) {
//         res.status(200).json({ message: "ล็อกอินสำเร็จ", user });
//       } else {
//         res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
//       }
//     } else {
//       res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
//     }
//   } catch (error) {
//     console.error("Error in login:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
