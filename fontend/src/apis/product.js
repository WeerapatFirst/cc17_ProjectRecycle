import axios from "/src/config/axios.js";

const productApi = {};

productApi.addProduct = (body) => axios.post("/products", body);
productApi.deleteProduct = (id) => axios.delete(`/products/${id}`);

export default productApi;
