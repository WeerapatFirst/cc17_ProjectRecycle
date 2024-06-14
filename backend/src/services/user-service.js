// วันที่ 13-06-67 แก้ไข

const prisma = require("../models/prisma");

const userFiltered = {
  id: true,
  firstname: true,
  lastname: true,
  email: true,
  phonenumber: true,
};

const userService = {};

// สร้างผู้ใช้ใหม่
userService.createUser = (data) => prisma.user.create({ data });

// ค้นหาผู้ใช้ด้วย email
userService.findEmail = (email) => prisma.user.findUnique({ where: { email } });

// ค้นหาผู้ใช้ด้วย ID
userService.findUserById = (userId) =>
  prisma.user.findUnique({ where: { id: userId } });

// ค้นหาผู้ใช้จากรายการ ID
userService.findUserByIdList = (idList) =>
  prisma.user.findMany({
    where: {
      id: {
        in: idList,
      },
    },
    select: userFiltered,
  });

// สร้างตะกร้าใหม่สำหรับผู้ใช้
userService.createCart = (userId) =>
  prisma.cart.create({
    data: {
      userId,
      createdAt: new Date(),
    },
  });

// เพิ่มสินค้าในตะกร้า ใช้ปัจจุบัน 13-06-67
// userService.addItemToCart = async (cartId, productId, quantity) => {
//   // ตรวจสอบว่าสินค้ามีอยู่ในฐานข้อมูลหรือไม่
//   const product = await prisma.product.findUnique({
//     where: { id: productId },
//   });

//   if (!product) {
//     throw new Error(`ไม่มีสินค้าที่มีรหัสนี้อยู่ ${productId}`);
//   }

//   // ตรวจสอบว่ามีรายการสินค้ารายการนี้อยู่ในตะกร้าแล้วหรือไม่
//   const existingCartItem = await prisma.cartItem.findUnique({
//     where: {
//       cartId_productId: {
//         // ตรวจสอบการมีอยู่โดยใช้ composite key
//         cartId,
//         productId,
//       },
//     },
//   });

//   if (existingCartItem) {
//     // ถ้ามีอยู่แล้ว ให้ทำการอัปเดตจำนวนสินค้า
//     return prisma.cartItem.update({
//       where: {
//         id: existingCartItem.id,
//       },
//       data: {
//         quantity: existingCartItem.quantity + quantity,
//       },
//     });
//   }

//   // ถ้าไม่มี ให้สร้างรายการสินค้าใหม่ในตะกร้า
//   return prisma.cartItem.create({
//     data: {
//       cartId,
//       productId,
//       quantity,
//     },
//   });
// };

// ทดสอบ 13-06-67 ใช้งานได้
// userService.addItemToCart = async (cartId, productId, quantity) => {
//   const product = await prisma.product.findUnique({ where: { id: productId } });
//   if (!product) throw new Error(`ไม่มีสินค้าที่มีรหัสนี้ ${productId} `);

//   const quantityNumber = parseInt(quantity, 10);
//   if (isNaN(quantityNumber)) throw new Error("quantity ต้องเป็นตัวเลขเท่านั้น");

//   return prisma.cartItem.create({
//     data: {
//       cartId,
//       productId,
//       quantity: quantityNumber,
//     },
//   });
// };

// ทดสอบ 14-06-67
userService.addItemToCart = async (cartId, items) => {
  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });

    if (!product) {
      throw new Error(`ไม่มีสินค้าที่มีรหัสนี้ ${item.productId} `);
    }

    const quantityNumber = parseInt(item.quantity, 10);
    if (isNaN(quantityNumber)) {
      throw new Error("quantity ต้องเป็นตัวเลขเท่านั้น");
    }

    await prisma.cartItem.create({
      data: {
        cartId,
        productId: item.productId,
        quantity: quantityNumber,
      },
    });
  }
};

// สร้าง TaskOrder ใหม่จากตะกร้า
userService.createTaskOrder = (cartId, deliveryDate, address) =>
  prisma.taskOrder.create({
    data: {
      cartId,
      pickupTime: new Date(deliveryDate),
      updatedAt: new Date(),
      status: "PENDING",
      address,
    },
  });

// เพิ่มค้นหา Cart โดย User ID
userService.findCartByUserId = (userId) =>
  prisma.cart.findUnique({
    where: { userId },
  });

// เพิ่มดึงรายการสินค้าใน Cart
userService.getCartItems = (cartId) =>
  prisma.cartItem.findMany({
    where: { cartId },
    include: {
      product: true, // รวมข้อมูลสินค้า
    },
  });

// เพิ่มลบสินค้าออกจากตะกร้า
userService.removeItemFromCart = (cartItemId) =>
  prisma.cartItem.delete({
    where: { id: cartItemId },
  });

// วันที่ 13-06-67 เคลียสินค้าออกจากตะกร้าหน้าเว็บ
userService.clearCart = async (userId) => {
  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: { cartItem: true },
  });

  if (cart) {
    const cartItemIds = cart.cartItem.map((item) => item.id);

    await prisma.cartItem.deleteMany({
      where: { id: { in: cartItemIds } },
    });
  }
};

// วันที่ 13-06-67 เข้าถึงข้อมูลแต่ละตารางเพื่อดึงไปใช้งานหน้า ประวัติการสั่งซื้อ
userService.getOrderHistory = async (userId) => {
  return prisma.taskOrder.findMany({
    where: {
      cart: {
        userId: parseInt(userId, 10),
      },
    },
    include: {
      cart: {
        include: {
          cartItem: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
};

module.exports = userService;

// ใช้ปัจจุบัน วันที่ 12-06-67
// const prisma = require("../models/prisma");

// const userFiltered = {
//   id: true,
//   firstname: true,
//   lastname: true,
//   email: true,
//   phonenumber: true,
// };

// const userService = {};

// userService.createUser = (data) => prisma.user.create({ data });
// userService.findEmail = (email) => prisma.user.findUnique({ where: { email } });
// userService.findUserById = (userId) =>
//   prisma.user.findUnique({ where: { id: userId } });
// // userService.updateUserById = (data, userId) =>
// //   prisma.user.update({
// //     where: { id: userId },
// //     data,
// //   });

// userService.findUserByIdList = (idList) =>
//   prisma.user.findMany({
//     where: {
//       id: {
//         in: idList,
//       },
//     },
//     select: userFiltered,
//   });

// // วันที่ 12-06-67 ส่วนของตะกร้า
// userService.createCart = (userId) =>
//   prisma.cart.create({
//     data: {
//       userId,
//       createdAt: new Date(),
//       // status: "PENDING",
//     },
//   });

// // ************************
// // เพิ่มรายการสินค้าไปยัง Cart
// // userService.addItemToCart = (cartId, productId, quantity) =>
// //   prisma.cartItem.create({
// //     data: {
// //       cartId,
// //       productId,
// //       quantity,
// //     },
// //   });

// // ทดทอบ
// userService.addItemToCart = async (cartId, productId, quantity) => {
//   // ตรวจสอบว่าผลิตภัณฑ์มีอยู่ในฐานข้อมูลหรือไม่
//   const product = await prisma.product.findUnique({
//     where: { id: productId },
//   });

//   if (!product) {
//     throw new Error(`ไม่มีสินค้าที่มีรหัสนี้อยู่ ${productId}`);
//   }

//   return prisma.cartItem.create({
//     data: {
//       cartId,
//       productId,
//       quantity,
//     },
//   });
// };

// // สร้าง TaskOrder สำหรับ Cart
// userService.createTaskOrder = (cartId, deliveryDate, address) =>
//   prisma.taskOrder.create({
//     data: {
//       cartId,
//       pickupTime: new Date(deliveryDate),
//       updatedAt: new Date(),
//       status: "PENDING",
//       address: address,
//     },
//   });

// module.exports = userService;
