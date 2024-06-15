// src/apis/admin.js
import axios from "../config/axios";

const adminApi = {};

adminApi.getAllOrders = () => axios.get("/admin/orders");
adminApi.updateOrder = (orderId, data) =>
  axios.put(`/admin/orders/${orderId}`, data);
adminApi.deleteOrder = (orderId) => axios.delete(`/admin/orders/${orderId}`);

export default adminApi;
