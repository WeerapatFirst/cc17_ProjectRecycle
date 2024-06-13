const express = require("express");
const orderController = require("../controllers/order-controller");
const authenticate = require("../middlewares/authenticate");

const orderRouter = express.Router();

orderRouter.post("/", authenticate, orderController.createOrder);

module.exports = orderRouter;
