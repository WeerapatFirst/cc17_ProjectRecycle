import axios from "../config/axios";

const orderApi = {};
// const productApi = {};

orderApi.createOrder = (body) => axios.post("/orders", body);
// orderApi.addItemToCart = (body) => axios.patch("/orders", body);
// orderApi.createTaskOrder = (body) => axios.post("/orders", body);

// productApi.addProduct = (body) => axios.delete("product", body);
// productApi.deleteProduct = (id) => axios.delete(`product/${id}`);

export default orderApi;
