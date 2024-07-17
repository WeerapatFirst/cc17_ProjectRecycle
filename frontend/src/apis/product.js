import axios from "/src/config/axios.js";

const productApi = {};

productApi.addProduct = (body) => axios.post("/products", body);
productApi.deleteProduct = (id) => axios.delete(`/products/${id}`);
// productApi.getCartProducts = (userId) => axios.get(`/products/cart/${userId}`); ไม่ต้องดึงข้อมูลในตะกร้าโชว์แล้ว
productApi.clearCart = (userId) => axios.delete(`/cart/clear/${userId}`);

export default productApi;
