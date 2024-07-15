// const prisma = require("../models/prisma");

// const productService = {};

// productService.addProduct = async (productData) => {
//   return prisma.productList.create({
//     data: {
//       name: productData.name,
//       unit: productData.unit,
//       price: productData.price.toString(), // ให้แน่ใจว่าเป็น string
//     },
//   });
// };

// productService.getAllProducts = async () => {
//   return prisma.productList.findMany();
// };

// module.exports = productService;

// ********************************** 29-06-67
const prisma = require("../models/prisma");

const productService = {};

productService.addProduct = async ({ name, unit, price }) => {
  return prisma.productList.create({
    data: {
      name,
      unit,
      price,
    },
  });
};

productService.getAllProducts = async () => {
  return prisma.productList.findMany();
};

productService.updateProduct = async (id, data) => {
  return prisma.productList.update({
    where: { id: parseInt(id, 10) },
    data,
  });
};

productService.deleteProduct = async (id) => {
  return prisma.productList.delete({
    where: { id: parseInt(id, 10) },
  });
};

module.exports = productService;
