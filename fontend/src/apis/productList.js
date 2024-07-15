// import axios from "/src/config/axios.js";

// const productListApi = {};

// productListApi.addProduct = (body) => axios.post("/products-List", body);
// productListApi.getAllProducts = () => axios.get("/products-List");

// export default productListApi;

// ******************* 29-06-67
import axios from "/src/config/axios.js";

const productListApi = {};

productListApi.addProduct = (body) =>
  axios.post("/products-List/add-product", body);
productListApi.getAllProducts = () => axios.get("/products-List");
productListApi.updateProduct = (id, body) =>
  axios.put(`/products-List/${id}`, body);
productListApi.deleteProduct = (id) => axios.delete(`/products-List/${id}`);

export default productListApi;
