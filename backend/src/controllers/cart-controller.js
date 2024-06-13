const prisma = require("../models/prisma");

const cartController = {};

// วันที่ 13-06-67
cartController.createCart = async (req, res, next) => {
  const { userId, items, address } = req.body;

  if (!userId || !items || !items.length || !address) {
    return res.status(400).json({
      message: "ข้อมูลไม่ครบ",
    });
  }

  try {
    const cart = await prisma.cart.create({
      data: {
        userId,
        cartItem: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
        taskOrder: {
          create: {
            status: "PENDING",
            address,
          },
        },
      },
    });
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

module.exports = cartController;
