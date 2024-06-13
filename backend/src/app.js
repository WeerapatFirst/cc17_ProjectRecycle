require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth-route");
const orderRouter = require("./routes/order-route");
const errorMiddleware = require("./middlewares/error");
const authenticate = require("./middlewares/authenticate");
const productRouter = require("./routes/product-route");
const cartRouter = require("./routes/cart-route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

// วันที่ 12-06-67
app.use("/orders", authenticate, orderRouter);
app.use("/products", productRouter);

// วันที่ 13-06-67
app.use("cart", authenticate, cartRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
