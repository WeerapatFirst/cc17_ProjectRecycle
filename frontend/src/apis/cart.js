import axios from "../config/axios";

const cartApi = {};

// วันที่ 13-06-67
cartApi.createCart = (body) => axios.post("/cart", body);

export default cartApi;
