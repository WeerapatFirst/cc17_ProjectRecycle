const express = require("express");
const orderController = require("../controllers/order-controller");
const authenticate = require("../middlewares/authenticate");
const checkUserRole = require("../middlewares/checkUserRole");

const orderRouter = express.Router();

orderRouter.post("/", authenticate, orderController.createOrder);
orderRouter.get(
  "/history/:userId",
  authenticate,
  orderController.getOrderHistory
);
orderRouter.delete(
  "/clearCart/:userId",
  authenticate,
  orderController.clearCart
);

// 17-06-67 ส่วนของหน้า admin
// orderRouter.get(
//   "user/:userId",
//   authenticate,
//   checkUserRole,
//   orderController.getOrdersByUserId
// );

module.exports = orderRouter;

// const express = require("express");
// const orderController = require("../controllers/order-controller");
// const authenticate = require("../middlewares/authenticate");
// const checkUserRole = require("../middlewares/checkUserRole");

// const orderRouter = express.Router();

// orderRouter.post("/", authenticate, checkUserRole, orderController.createOrder);
// orderRouter.get(
//   "/history/:userId",
//   authenticate,
//   orderController.getOrderHistory
// );
// orderRouter.delete(
//   "/clearCart/:userId",
//   authenticate,
//   orderController.clearCart
// );

// module.exports = orderRouter;
