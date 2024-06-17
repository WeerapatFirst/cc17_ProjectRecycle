const prisma = require("../models/prisma");

const productController = {};

// วันที่ 13-06-67
productController.createProduct = async (req, res, next) => {
  const { name, weight, price, userId } = req.body;

  if (!name || !weight || !price || !userId) {
    return res.status(400).json({ message: "ข้อมูลไม่ครบ" });
  }

  try {
    const parsedWeight = parseFloat(weight);
    const parsedPrice = parseFloat(price);
    const parsedUserId = parseInt(userId);

    if (isNaN(parsedWeight) || isNaN(parsedPrice) || isNaN(parsedUserId)) {
      return res.status(400).json({ message: "ข้อมูลไม่ถูกต้อง" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        weight: parsedWeight,
        price: parsedPrice,
        userId: parsedUserId,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

productController.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "ID ไม่ถูกต้อง" });
    }

    const product = await prisma.product.delete({
      where: { id: parsedId },
    });
    res.status(200).json({ message: "ลบสินค้าสำเร็จ", product });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "ไม่พบสินค้า" });
    } else {
      next(error);
    }
  }
};

// ***** 17-06-67
// productController.deleteProduct = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const product = await prisma.product.delete({
//       where: { id: parseInt(id) },
//     });
//     res.status(200).json({ message: "ลบสินค้าสำเร็จ", product });
//   } catch (error) {
//     if (error.code === "P2025") {
//       res.status(404).json({ message: "Product not found" });
//     } else {
//       next(error);
//     }
//   }
// };

productController.getCartProducts = async (req, res, next) => {
  const userId = parseInt(req.params.userId);

  try {
    const products = await prisma.product.findMany({
      where: { userId },
    });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// 13-06-67 ทำไว้ล้างตะกร้า
productController.clearCart = async (req, res, next) => {
  const { userId } = req.params;

  try {
    await userService.clearCart(parseInt(userId, 10));
    res.status(200).json({ message: "ล้างตะกร้าสำเร็จ" });
  } catch (error) {
    next(error);
  }
};

// วันที่ 12-06-67 ใช้ปุจจุบัน
// productController.deleteProduct = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const product = await prisma.product.findUnique({
//       where: { id: Number(id) },
//     });

//     if (!product) {
//       return res.status(404).json({ message: "ไม่พบสินค้า" });
//     }
//     console.log(product);

//     await prisma.product.delete({
//       where: { id: Number(id) },
//     });

//     res.status(204).json();
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = productController;
