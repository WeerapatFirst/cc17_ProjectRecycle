// import { useState } from "react";
// import productApi from "../../apis/product";
// import { toast } from "react-toastify";

// export default function AdminAddProduct() {
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     unit: "",
//     price: 0,
//   });

//   const handleAddNewProduct = async () => {
//     if (!newProduct.name || !newProduct.unit || newProduct.price <= 0) {
//       toast.error("กรุณากรอกข้อมูลสินค้าที่ถูกต้อง");
//       return;
//     }

//     try {
//       await productApi.addProduct({
//         name: newProduct.name,
//         unit: newProduct.unit,
//         price: newProduct.price.toString(),
//       });
//       toast.success("เพิ่มสินค้าสำเร็จ");
//       setNewProduct({
//         name: "",
//         unit: "",
//         price: 0,
//       });
//     } catch (error) {
//       console.error("เพิ่มสินค้าไม่สำเร็จ:", error);
//       toast.error("เพิ่มสินค้าไม่สำเร็จ: " + error.message);
//     }
//   };

//   return (
//     <section className="container mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-4xl font-bold mb-4 text-center">เพิ่มสินค้าใหม่</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700 mb-2">ชื่อสินค้า</label>
//         <input
//           type="text"
//           className="block w-full p-2 border rounded"
//           value={newProduct.name}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, name: e.target.value })
//           }
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 mb-2">หน่วย</label>
//         <input
//           type="text"
//           className="block w-full p-2 border rounded"
//           value={newProduct.unit}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, unit: e.target.value })
//           }
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 mb-2">ราคา</label>
//         <input
//           type="number"
//           className="block w-full p-2 border rounded"
//           value={newProduct.price}
//           onChange={(e) =>
//             setNewProduct({
//               ...newProduct,
//               price: parseFloat(e.target.value),
//             })
//           }
//         />
//       </div>
//       <div className="flex justify-end">
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-700"
//           onClick={handleAddNewProduct}
//         >
//           เพิ่มสินค้า
//         </button>
//       </div>
//     </section>
//   );
// }

// ********************************* ใช้ปัจจุบัน
// import { useState } from "react";
// import productList from "../../apis/productList";
// import { toast } from "react-toastify";

// export default function AdminAddProduct() {
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     unit: "",
//     price: "",
//   });

//   const handleAddNewProduct = async () => {
//     if (!newProduct.name || !newProduct.unit || !newProduct.price) {
//       toast.error("กรุณากรอกข้อมูลสินค้าที่ถูกต้อง");
//       return;
//     }

//     try {
//       await productList.addProduct({
//         name: newProduct.name,
//         unit: newProduct.unit,
//         price: newProduct.price,
//       });
//       toast.success("เพิ่มสินค้าสำเร็จ");
//       setNewProduct({
//         name: "",
//         unit: "",
//         price: "",
//       });
//     } catch (error) {
//       console.error("เพิ่มสินค้าไม่สำเร็จ:", error);
//       toast.error(
//         "เพิ่มสินค้าไม่สำเร็จ: " +
//           (error.response?.data?.message || error.message)
//       );
//     }
//   };

//   return (
//     <section className="container mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-4xl font-bold mb-4 text-center">เพิ่มสินค้าใหม่</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700 mb-2">ชื่อสินค้า</label>
//         <input
//           type="text"
//           className="block w-full p-2 border rounded"
//           value={newProduct.name}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, name: e.target.value })
//           }
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 mb-2">หน่วย</label>
//         <input
//           type="text"
//           className="block w-full p-2 border rounded"
//           value={newProduct.unit}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, unit: e.target.value })
//           }
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 mb-2">ราคา</label>
//         <input
//           type="text"
//           className="block w-full p-2 border rounded"
//           value={newProduct.price}
//           onChange={(e) =>
//             setNewProduct({
//               ...newProduct,
//               price: e.target.value,
//             })
//           }
//         />
//       </div>
//       <div className="flex justify-end">
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-700"
//           onClick={handleAddNewProduct}
//         >
//           เพิ่มสินค้า
//         </button>
//       </div>
//     </section>
//   );
// }

// ************************* 29-06-67
import { useState, useEffect } from "react";
import productListApi from "../../apis/productList";
import { toast } from "react-toastify";

export default function AdminAddProduct() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    unit: "",
    price: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await productListApi.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("ไม่สามารถดึงข้อมูลสินค้าได้:", error);
      toast.error("ไม่สามารถดึงข้อมูลสินค้าได้");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddNewProduct = async () => {
    if (!newProduct.name || !newProduct.unit || !newProduct.price) {
      toast.error("กรุณากรอกข้อมูลสินค้าที่ถูกต้อง");
      return;
    }

    try {
      await productListApi.addProduct(newProduct);
      toast.success("เพิ่มสินค้าสำเร็จ");
      setNewProduct({ name: "", unit: "", price: "" });
      fetchProducts();
    } catch (error) {
      console.error("เพิ่มสินค้าไม่สำเร็จ:", error);
      toast.error(
        "เพิ่มสินค้าไม่สำเร็จ: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setEditProduct(product);
  };

  const handleSaveEditProduct = async () => {
    if (!editProduct.name || !editProduct.unit || !editProduct.price) {
      toast.error("กรุณากรอกข้อมูลสินค้าที่ถูกต้อง");
      return;
    }

    try {
      await productListApi.updateProduct(editProduct.id, editProduct);
      toast.success("แก้ไขสินค้าสำเร็จ");
      setEditProduct(null);
      setIsEditing(false);
      fetchProducts();
    } catch (error) {
      console.error("แก้ไขสินค้าไม่สำเร็จ:", error);
      toast.error(
        "แก้ไขสินค้าไม่สำเร็จ: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleDeleteProduct = async (productId) => {
    const isConfirmed = window.confirm("ต้องการลบหรือไม่");
    if (isConfirmed) {
      try {
        await productListApi.deleteProduct(productId);
        toast.success("ลบสินค้าสำเร็จ");
        fetchProducts();
      } catch (error) {
        console.error("ลบสินค้าไม่สำเร็จ:", error);
        toast.error(
          "ลบสินค้าไม่สำเร็จ: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  return (
    <section className="container mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-4 text-center">เพิ่มสินค้าใหม่</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">ชื่อสินค้า</label>
        <input
          type="text"
          className="block w-full p-2 border rounded"
          value={isEditing ? editProduct.name : newProduct.name}
          onChange={(e) =>
            isEditing
              ? setEditProduct({ ...editProduct, name: e.target.value })
              : setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">หน่วย</label>
        <input
          type="text"
          className="block w-full p-2 border rounded"
          value={isEditing ? editProduct.unit : newProduct.unit}
          onChange={(e) =>
            isEditing
              ? setEditProduct({ ...editProduct, unit: e.target.value })
              : setNewProduct({ ...newProduct, unit: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">ราคา</label>
        <input
          type="text"
          className="block w-full p-2 border rounded"
          value={isEditing ? editProduct.price : newProduct.price}
          onChange={(e) =>
            isEditing
              ? setEditProduct({ ...editProduct, price: e.target.value })
              : setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
      </div>
      <div className="flex justify-end">
        {isEditing ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700 mr-2"
            onClick={handleSaveEditProduct}
          >
            บันทึกการแก้ไข
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-700"
            onClick={handleAddNewProduct}
          >
            เพิ่มสินค้า
          </button>
        )}
      </div>

      <h2 className="text-4xl font-bold mb-4 text-center mt-16">
        รายการสินค้า
      </h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200">ลำดับที่</th>
            <th className="py-2 px-4 bg-gray-200">ชื่อสินค้า</th>
            <th className="py-2 px-4 bg-gray-200">หน่วย</th>
            <th className="py-2 px-4 bg-gray-200">ราคา</th>
            <th className="py-2 px-4 bg-gray-200">แก้ไข</th>
            <th className="py-2 px-4 bg-gray-200">ลบ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="text-center">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.unit}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg  hover:bg-yellow-400"
                  onClick={() => handleEditProduct(product)}
                >
                  แก้ไข
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
