const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const orderController = {};

// วันที่ 13-06-67 ใช้ปัจจุบัน
// orderController.createOrder = async (req, res, next) => {
//   const { userId, items, deliveryDate, address } = req.body;

//   if (!userId || !items || !items.length || !deliveryDate || !address) {
//     return res.status(400).json({
//       message: "ข้อมูลไม่ถูกต้อง",
//     });
//   }

//   try {
//     // สร้างหรือดึง Cart สำหรับผู้ใช้
//     const cart = await userService.createCart(userId);
//     const cartId = cart.id;

//     for (const item of items) {
//       await userService.addItemToCart(cartId, item.productId, item.quantity);
//     }

//     // สร้าง TaskOrder สำหรับ Cart
//     await userService.createTaskOrder(cartId, deliveryDate, address);

//     // ลบสินค้าทั้งหมดจากตะกร้าหลังจากสร้างคำสั่งซื้อสำเร็จ
//     await userService.clearCart(userId);

//     res.status(201).json({ message: "คำสั่งซื้อสำเร็จ" });
//   } catch (error) {
//     next(error);
//   }
// };

// ทดสอบ 14-06-67
orderController.createOrder = async (req, res, next) => {
  const { userId, items, deliveryDate, address } = req.body;

  if (!userId || !items || !items.length || !deliveryDate || !address) {
    return res.status(400).json({
      message: "ข้อมูลไม่ถูกต้อง",
    });
  }

  try {
    const cart = await userService.createCart(userId);
    const cartId = cart.id;

    await userService.addItemToCart(cartId, items);

    await userService.createTaskOrder(cartId, deliveryDate, address);

    await userService.clearCart(userId); // ล้างตะกร้าหลังจากสั่งซื้อสำเร็จ

    res.status(201).json({ message: "คำสั่งซื้อสำเร็จ" });
  } catch (error) {
    next(error);
  }
};

// วันที่ 13-06-67 ประวัติสั่งซื้อ
orderController.getOrderHistory = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const orderHistory = await userService.getOrderHistory(userId);
    res.status(200).json(orderHistory);
  } catch (error) {
    next(error);
  }
};

orderController.clearCart = async (req, res, next) => {
  const { userId } = req.params;

  try {
    await userService.clearCart(userId);
    res.status(200).json({ message: "ล้างตะกร้าสำเร็จ" });
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
