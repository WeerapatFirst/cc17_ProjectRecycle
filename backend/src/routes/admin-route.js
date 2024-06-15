// วันที่ 14-06-67 admin
const express = require("express");
const adminController = require("../controllers/admin-controller");
const authenticate = require("../middlewares/authenticate");
const checkUserRole = require("../middlewares/checkUserRole");

const adminRouter = express.Router();

adminRouter.use(authenticate, checkUserRole);

adminRouter.get("/orders", adminController.getAllOrders);
adminRouter.put("/orders/:orderId", adminController.updateOrder);
adminRouter.delete("/orders/:orderId", adminController.deleteOrder);

module.exports = adminRouter;
