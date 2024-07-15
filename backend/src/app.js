require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth-route");
const orderRouter = require("./routes/order-route");
const errorMiddleware = require("./middlewares/error");
const authenticate = require("./middlewares/authenticate");
const productRouter = require("./routes/product-route");
const cartRouter = require("./routes/cart-route");
const adminRouter = require("./routes/admin-route");
const productListRouter = require("./routes/productList-route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

// วันที่ 12-06-67
app.use("/orders", authenticate, orderRouter);
app.use("/products", productRouter);

app.use("/products-List", productListRouter);

// วันที่ 13-06-67
app.use("cart", authenticate, cartRouter);

// วันที่ 14-06-67 ส่วนของ admin
app.use("/admin", authenticate, adminRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
