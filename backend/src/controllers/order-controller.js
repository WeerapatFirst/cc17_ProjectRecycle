const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const orderController = {};

// วันที่ 13-06-67
orderController.createOrder = async (req, res, next) => {
  const { userId, items, deliveryDate, address } = req.body;

  if (!userId || !items || !items.length || !deliveryDate || !address) {
    return res.status(400).json({
      message: "ข้อมูลไม่ถูกต้อง",
    });
  }

  try {
    // สร้างหรือดึง Cart สำหรับผู้ใช้
    const cart = await userService.createCart(userId);
    const cartId = cart.id;

    for (const item of items) {
      await userService.addItemToCart(cartId, item.productId, item.quantity);
    }

    // สร้าง TaskOrder สำหรับ Cart
    await userService.createTaskOrder(cartId, deliveryDate, address);

    res.status(201).json({ message: "คำสั่งซื้อสำเร็จ" });
  } catch (error) {
    next(error);
  }
};

// วันที่ 12-06-67 ใช้ปัจจุบัน
// orderController.createOrder = async (req, res, next) => {
//   const { userId, items, deliveryDate, address } = req.body;

//   if (!userId || !items || !items.length || !deliveryDate || !address) {
//     return res.status(400).json({
//       message: "ข้อมูลไม่ถูกต้อง",
//     });
//   }

//   try {
//     // สร้าง Cart สำหรับผู้ใช้
//     const cart = await userService.createCart(userId);
//     const cartId = cart.id;

//     for (const item of items) {
//       await userService.addItemToCart(cartId, item.productId, item.quantity);
//     }

//     // สร้าง TaskOrder สำหรับ Cart
//     await userService.createTaskOrder(cartId, deliveryDate, address);

//     res.status(201).json({ message: "คำสั่งซื้อสำเร็จ" });
//   } catch (error) {
//     next(error);
//   }
// };
// -----------------------------------

module.exports = orderController;
