// const express = require("express");
// const productController = require("../controllers/product-controller");
// const authenticate = require("../middlewares/authenticate");
// const checkUserRole = require("../middlewares/checkUserRole");
// const productListController = require("../controllers/productList-controller");

// const productListRouter = express.Router();

// // productListRouter.use(authenticate, checkUserRole);

// productListRouter.post("", productListController.addProduct);
// productListRouter.get("/", productListController.getAllProducts);

// module.exports = productListRouter;

// *********************************** 29-06-67
const express = require("express");
const productListController = require("../controllers/productList-controller");
const authenticate = require("../middlewares/authenticate");
const checkUserRole = require("../middlewares/checkUserRole");

const productListRouter = express.Router();

productListRouter.post(
  "/add-product",
  authenticate,
  // checkUserRole,
  productListController.addProduct
);
productListRouter.get("/", productListController.getAllProducts);
productListRouter.put(
  "/:id",
  authenticate,
  // checkUserRole,
  productListController.updateProduct
);
productListRouter.delete(
  "/:id",
  authenticate,
  // checkUserRole,
  productListController.deleteProduct
);

module.exports = productListRouter;
