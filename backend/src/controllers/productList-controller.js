// const prisma = require("../models/prisma");
// const productService = require("../services/product-service");

// const productListController = {};

// productListController.addProduct = async (req, res, next) => {
//   const { name, unit, price } = req.body;

//   if (!name || !unit || !price) {
//     return res.status(400).json({ message: "ข้อมูลไม่ครบ" });
//   }

//   try {
//     const newProduct = await productService.addProduct({ name, unit, price });
//     res.status(201).json(newProduct);
//   } catch (error) {
//     next(error);
//   }
// };

// productListController.getAllProducts = async (req, res, next) => {
//   try {
//     const products = await productService.getAllProducts();
//     res.status(200).json(products);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = productListController;

// ************************** 29-06-67
// src/controllers/productList-controller.js

const productService = require("../services/product-service");

const productListController = {};

productListController.addProduct = async (req, res, next) => {
  const { name, unit, price } = req.body;

  if (!name || !unit || !price) {
    return res.status(400).json({ message: "ข้อมูลไม่ครบ" });
  }

  try {
    const newProduct = await productService.addProduct({
      name,
      unit,
      price,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

productListController.getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

productListController.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, unit, price } = req.body;

  try {
    const updatedProduct = await productService.updateProduct(id, {
      name,
      unit,
      price,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

productListController.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    await productService.deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = productListController;
