import axios from "/src/config/axios.js";

const orderApi = {};

orderApi.createOrder = (body) => axios.post("/orders", body);
orderApi.getOrderHistory = (userId) => axios.get(`/orders/history/${userId}`);

export default orderApi;
