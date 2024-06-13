const express = require("express");
const cartController = require("../controllers/cart-controller");
const authenticate = require("../middlewares/authenticate");

const cartRouter = express.Router();

// วันที่ 13-06-67
cartRouter.post("/", authenticate, cartController.createCart);

module.exports = cartRouter;
