// const express = require("express");
// const productController = require("../controllers/product-controller");

// const productRouter = express.Router();

// productRouter.post("/", productController.createProduct);
// // productRouter.delete("/:id", productController.deleteProduct);
// productRouter.delete("/:id", productController.deleteProduct);

// module.exports = productRouter;

const express = require("express");
const productController = require("../controllers/product-controller");

const productRouter = express.Router();

// วันที่ 13-06-67
productRouter.post("/", productController.createProduct);
productRouter.delete("/:id", productController.deleteProduct);

module.exports = productRouter;
