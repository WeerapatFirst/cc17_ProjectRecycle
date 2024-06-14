import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productApi from "../../apis/product";
import useUser from "../../hooks/useUser";

// export default function BuyForm() {
//   const items1 = [
//     { id: 1, type: "พลาสติกรวม", unit: "กก", price: "4.1" },
//     { id: 2, type: "ถุงสะอาด", unit: "กก", price: "4.5" },
//     { id: 3, type: "แผ่นซีดี", unit: "กก", price: "8.0" },
//   ];
//   const items2 = [
//     { id: 4, type: "เหล็กรวม", unit: "กก", price: "8.8" },
//     { id: 5, type: "กระป๋องสังกะสี", unit: "กก", price: "6.1" },
//     { id: 6, type: "สังกะสีแผ่น", unit: "กก", price: "5.1" },
//   ];
//   const items3 = [
//     { id: 7, type: "กระดาษลัง", unit: "กก", price: "3.5" },
//     { id: 8, type: "กระดาษขวาดำ", unit: "กก", price: "5.0" },
//     { id: 9, type: "หนังสือพิมพ์", unit: "กก", price: "7.0" },
//   ];

//   const [open, setOpen] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [selectedItem, setSelectedItem] = useState({});
//   const [quantity, setQuantity] = useState(0);

//   const navigate = useNavigate();

//   const addItemToCart = async () => {
//     const newItem = { ...selectedItem, quantity, userId: 1 }; // กำหนด userId ตามต้องการ
//     try {
//       const response = await productApi.addProduct(newItem);
//       const productWithId = response.data;
//       setCart([...cart, productWithId]);
//       setOpen(false);
//       navigate("/cart", { state: { cart: [...cart, productWithId] } });
//     } catch (error) {
//       console.error("เพิ่มสินค้าไม่สำเร็จ :", error);
//     }
//   };

//   // วันที่ 12-06-67 ใช้ปัจจุบัน
//   // const addItemToCart = async () => {
//   //   if (!selectedItem.id) {
//   //     alert("เลือกสินค้าที่ถูกต้อง");
//   //     return;
//   //   }

//   //   // สร้าง product ใหม่ในระบบ
//   //   const newItem = { ...selectedItem, quantity };

//   //   // เพิ่ม product ลงในตะกร้า (cart) และส่งข้อมูลไปที่ backend
//   //   setCart([...cart, newItem]);
//   //   try {
//   //     const productData = {
//   //       id: selectedItem.id,
//   //       name: selectedItem.type,
//   //       weight: quantity,
//   //       price: selectedItem.price,
//   //       isActive: true,
//   //     };

//   //     // เรียก API เพื่อเพิ่ม product
//   //     await productApi.addProduct(productData);

//   //     setOpen(false);
//   //     navigate("/cart", { state: { cart: [...cart, newItem] } });
//   //   } catch (error) {
//   //     console.error("เพิ่มสินค้าไม่สำเร็จ :", error);
//   //     alert("เพิ่มสินค้าไม่สำเร็จ");
//   //   }
//   // };

//   return (
//     <section className="container mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-4xl font-bold mb-4 text-center">ราคารับซื้อ</h2>
//       <button
//         className="bg-blue-500 float-end text-white text-lg px-4 p-2 mb-2 rounded-md hover:bg-blue-700"
//         onClick={() => setOpen(true)}
//       >
//         เพิ่มสินค้า
//       </button>
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 bg-gray-200">ลำดับที่</th>
//             <th className="py-2 px-4 bg-gray-200">ประเภทพลาสติก</th>
//             <th className="py-2 px-4 bg-gray-200">หน่วย</th>
//             <th className="py-2 px-4 bg-gray-200">ราคา</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items1.map((item) => (
//             <tr key={item.id} className="text-center">
//               <td className="py-2 px-4 border-b">{item.id}</td>
//               <td className="py-2 px-4 border-b">{item.type}</td>
//               <td className="py-2 px-4 border-b">{item.unit}</td>
//               <td className="py-2 px-4 border-b">{item.price}</td>
//             </tr>
//           ))}
//         </tbody>

//         <thead>
//           <tr>
//             <th className="py-2 px-4 bg-gray-200">ลำดับที่</th>
//             <th className="py-2 px-4 bg-gray-200">ประเภทเศษเหล็ก</th>
//             <th className="py-2 px-4 bg-gray-200">หน่วย</th>
//             <th className="py-2 px-4 bg-gray-200">ราคา</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items2.map((item) => (
//             <tr key={item.id} className="text-center">
//               <td className="py-2 px-4 border-b">{item.id}</td>
//               <td className="py-2 px-4 border-b">{item.type}</td>
//               <td className="py-2 px-4 border-b">{item.unit}</td>
//               <td className="py-2 px-4 border-b">{item.price}</td>
//             </tr>
//           ))}
//         </tbody>

//         <thead>
//           <tr>
//             <th className="py-2 px-4 bg-gray-200">ลำดับที่</th>
//             <th className="py-2 px-4 bg-gray-200">ประเภทกระดาษ</th>
//             <th className="py-2 px-4 bg-gray-200">หน่วย</th>
//             <th className="py-2 px-4 bg-gray-200">ราคา</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items3.map((item) => (
//             <tr key={item.id} className="text-center">
//               <td className="py-2 px-4 border-b">{item.id}</td>
//               <td className="py-2 px-4 border-b">{item.type}</td>
//               <td className="py-2 px-4 border-b">{item.unit}</td>
//               <td className="py-2 px-4 border-b">{item.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {open && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-3/12">
//             <h3 className="text-2xl font-bold mb-4 flex justify-center">
//               เพิ่มสินค้าลงตะกร้า
//             </h3>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">ประเภทสินค้า</label>
//               <select
//                 className="block w-full p-2 border rounded"
//                 onChange={(e) => {
//                   const selectedItem = [...items1, ...items2, ...items3].find(
//                     (item) => item.type === e.target.value
//                   );
//                   setSelectedItem(selectedItem);
//                 }}
//               >
//                 <option value="">เลือกประเภทสินค้า</option>
//                 {[...items1, ...items2, ...items3].map((item) => (
//                   <option key={item.id} value={item.type}>
//                     {item.type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">จำนวน</label>
//               <input
//                 type="number"
//                 className="block w-full p-2 border rounded"
//                 value={quantity}
//                 onChange={(e) => setQuantity(Number(e.target.value))}
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-red-700 mr-2"
//                 onClick={() => setOpen(false)}
//               >
//                 ยกเลิก
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700"
//                 onClick={addItemToCart}
//               >
//                 เพิ่ม
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// ใช้ปัจจุบัน 12-06-67
// export default function BuyForm() {
//   const items1 = [
//     { id: 1, type: "พลาสติกรวม", unit: "กก", price: "4.1" },
//     { id: 2, type: "ถุงสะอาด", unit: "กก", price: "4.5" },
//     { id: 3, type: "แผ่นซีดี", unit: "กก", price: "8.0" },
//   ];
//   const items2 = [
//     { id: 4, type: "เหล็กรวม", unit: "กก", price: "8.8" },
//     { id: 5, type: "กระป๋องสังกะสี", unit: "กก", price: "6.1" },
//     { id: 6, type: "สังกะสีแผ่น", unit: "กก", price: "5.1" },
//   ];
//   const items3 = [
//     { id: 7, type: "กระดาษลัง", unit: "กก", price: "3.5" },
//     { id: 8, type: "กระดาษขวาดำ", unit: "กก", price: "5.0" },
//     { id: 9, type: "หนังสือพิมพ์", unit: "กก", price: "7.0" },
//   ];

//   const [open, setOpen] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [selectedItem, setSelectedItem] = useState({});
//   const [quantity, setQuantity] = useState(0);

//   const navigate = useNavigate();

//   // วันที่ 12-06-67 ใช้ปัจจุบัน
//   // const addItemToCart = async () => {
//   //   const newItem = { ...selectedItem, quantity };
//   //   setCart([...cart, newItem]);

//   //   // วันที่ 13-06-67
//   //   try {
//   //     await productApi.addProduct({
//   //       name: selectedItem.type,
//   //       weight: quantity,
//   //       price: selectedItem.price,
//   //       isActive: true,
//   //     });
//   //     setOpen(false);
//   //     navigate("/cart", { state: { cart: [...cart, newItem] } });
//   //   } catch (error) {
//   //     console.error("เพิ่มสินค้าไม่สำเร็จ :", error);
//   //     alert("เพิ่มสินค้าไม่สำเร็๗");
//   //   }
//   // };

//   // วันที่ 13-06-67 เพิ่มสินค้าในตะกร้า
//   // const addItemToCart = async () => {
//   //   const newItem = { ...selectedItem, quantity };
//   //   try {
//   //     const response = await productApi.addProduct(newItem);
//   //     const productWithId = response.data;
//   //     setCart([...cart, productWithId]);
//   //     setOpen(false);
//   //     navigate("/cart", { state: { cart: [...cart, productWithId] } });
//   //   } catch (error) {
//   //     console.error("เพิ่มสินค้าไม่สำเร็จ :", error);
//   //   }
//   // };

//   const addItemToCart = async () => {
//     if (!selectedItem.id) {
//       alert("เลือกสินค้าที่ถูกต้อง");
//       return;
//     }
//     const newItem = { ...selectedItem, quantity };
//     setCart([...cart, newItem]);
//     try {
//       await productApi.addProduct({
//         id: selectedItem.id,
//         name: selectedItem.type,
//         weight: quantity,
//         price: selectedItem.price,
//         isActive: true,
//       });
//       setOpen(false);
//       navigate("/cart", { state: { cart: [...cart, newItem] } });
//     } catch (error) {
//       console.error("เพิ่มสินค้าไม่สำเร็จ :", error);
//       alert("เพิ่มสินค้าไม่สำเร็จ");
//     }
//   };

//   return (
//     <section className="container mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-4xl font-bold mb-4 text-center">ราคารับซื้อ</h2>
//       <button
//         className="bg-blue-500 float-end text-white text-lg px-4 p-2 mb-2 rounded-md hover:bg-blue-700  "
//         onClick={() => setOpen(true)}
//       >
//         เพิ่มสินค้า
//       </button>
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 bg-gray-200">ลำดับที่</th>
//             <th className="py-2 px-4 bg-gray-200">ประเภทพลาสติก</th>
//             <th className="py-2 px-4 bg-gray-200">หน่วย</th>
//             <th className="py-2 px-4 bg-gray-200">ราคา</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items1.map((item) => (
//             <tr key={item.id} className="text-center">
//               <td className="py-2 px-4 border-b">{item.id}</td>
//               <td className="py-2 px-4 border-b">{item.type}</td>
//               <td className="py-2 px-4 border-b">{item.unit}</td>
//               <td className="py-2 px-4 border-b">{item.price}</td>
//             </tr>
//           ))}
//         </tbody>

//         <thead>
//           <tr>
//             <th className="py-2 px-4 bg-gray-200">ลำดับที่</th>
//             <th className="py-2 px-4 bg-gray-200">ประเภทเศษเหล็ก</th>
//             <th className="py-2 px-4 bg-gray-200">หน่วย</th>
//             <th className="py-2 px-4 bg-gray-200">ราคา</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items2.map((item) => (
//             <tr key={item.id} className="text-center">
//               <td className="py-2 px-4 border-b">{item.id}</td>
//               <td className="py-2 px-4 border-b">{item.type}</td>
//               <td className="py-2 px-4 border-b">{item.unit}</td>
//               <td className="py-2 px-4 border-b">{item.price}</td>
//             </tr>
//           ))}
//         </tbody>

//         <thead>
//           <tr>
//             <th className="py-2 px-4 bg-gray-200">ลำดับที่</th>
//             <th className="py-2 px-4 bg-gray-200">ประเภทกระดาษ</th>
//             <th className="py-2 px-4 bg-gray-200">หน่วย</th>
//             <th className="py-2 px-4 bg-gray-200">ราคา</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items3.map((item) => (
//             <tr key={item.id} className="text-center">
//               <td className="py-2 px-4 border-b">{item.id}</td>
//               <td className="py-2 px-4 border-b">{item.type}</td>
//               <td className="py-2 px-4 border-b">{item.unit}</td>
//               <td className="py-2 px-4 border-b">{item.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {open && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-3/12">
//             <h3 className="text-2xl font-bold mb-4 flex justify-center">
//               เพิ่มสินค้าลงตะกร้า
//             </h3>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">ประเภทสินค้า</label>
//               <select
//                 className="block w-full p-2 border rounded"
//                 onChange={(e) => {
//                   const selectedItem = [...items1, ...items2, ...items3].find(
//                     (item) => item.type === e.target.value
//                   );
//                   setSelectedItem(selectedItem);
//                 }}
//               >
//                 <option value="">เลือกประเภทสินค้า</option>
//                 {[...items1, ...items2, ...items3].map((item) => (
//                   <option key={item.id} value={item.type}>
//                     {item.type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">จำนวน</label>
//               <input
//                 type="text"
//                 className="block w-full p-2 border rounded"
//                 value={quantity}
//                 onChange={(e) => setQuantity(Number(e.target.value))}
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-red-700 mr-2"
//                 onClick={() => setOpen(false)}
//               >
//                 ยกเลิก
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-4 rounded-lg text-lg hover:bg-blue-700"
//                 onClick={addItemToCart}
//               >
//                 เพิ่ม
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* วันที่ 12-06-67 ปุ่มซื้อ */}
//       {/* <div className="flex justify-end mt-4">
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-700"
//           onClick={handleOrder}
//         >
//           สั่งซื้อ
//         </button>
//       </div> */}
//     </section>
//   );
// }

// --------------ทดสอบ วันที่ 13-06-67 -------------------
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import productApi from "../../apis/product";

export default function BuyForm() {
  const items1 = [
    { id: 1, type: "พลาสติกรวม", unit: "กก", price: 4.1 },
    { id: 2, type: "ถุงสะอาด", unit: "กก", price: 4.5 },
    { id: 3, type: "แผ่นซีดี", unit: "กก", price: 8.0 },
  ];
  const items2 = [
    { id: 4, type: "เหล็กรวม", unit: "กก", price: 8.8 },
    { id: 5, type: "กระป๋องสังกะสี", unit: "กก", price: 6.1 },
    { id: 6, type: "สังกะสีแผ่น", unit: "กก", price: 5.1 },
  ];
  const items3 = [
    { id: 7, type: "กระดาษลัง", unit: "กก", price: 3.5 },
    { id: 8, type: "กระดาษขวาดำ", unit: "กก", price: 5.0 },
    { id: 9, type: "หนังสือพิมพ์", unit: "กก", price: 7.0 },
  ];

  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const { authUser: user } = useUser();

  const navigate = useNavigate();

  // ใช้ปัจจุบัน 13-06-67
  const addItemToCart = async () => {
    if (!selectedItem || quantity <= 0) {
      alert("กรุณาเลือกประเภทสินค้าและระบุจำนวนที่ถูกต้อง");
      return;
    }

    const newItem = {
      name: selectedItem.type,
      weight: quantity, // ใส่น้ำหนักที่เหมาะสม
      price: selectedItem.price,
      userId: user.id, // หรือค่า userId จาก context หรือ state ที่เก็บค่าผู้ใช้ปัจจุบัน
    };

    try {
      const response = await productApi.addProduct(newItem);
      const productWithId = response.data;
      setCart([...cart, productWithId]);
      setOpen(false);
      navigate("/cart", { state: { cart: [...cart, productWithId] } });
    } catch (error) {
      console.error("เพิ่มสินค้าไม่สำเร็จ:", error);
      alert(
        "เพิ่มสินค้าไม่สำเร็จ: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  // ทดสอบ
  // const addItemToCart = async () => {
  //   const newItem = { ...selectedItem, quantity, userId: 1 }; // กำหนด userId ตามต้องการ
  //   try {
  //     const response = await productApi.addProduct(newItem);
  //     const productWithId = response.data;
  //     setCart((prevCart) => [...prevCart, productWithId]);
  //     setOpen(false);
  //     navigate("/cart", { state: { cart: [...cart, productWithId] } });
  //   } catch (error) {
  //     console.error("เพิ่มสินค้าไม่สำเร็จ :", error);
  //   }
  // };

  return (
    <section className="container mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-4 text-center">ราคารับซื้อ</h2>
      <button
        className="bg-blue-500 float-end text-white text-lg px-4 p-2 mb-2 rounded-md hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        เพิ่มสินค้า
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200">ลำดับที่</th>
            <th className="py-2 px-4 bg-gray-200">ประเภทพลาสติก</th>
            <th className="py-2 px-4 bg-gray-200">หน่วย</th>
            <th className="py-2 px-4 bg-gray-200">ราคา</th>
          </tr>
        </thead>
        <tbody>
          {items1.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.type}</td>
              <td className="py-2 px-4 border-b">{item.unit}</td>
              <td className="py-2 px-4 border-b">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200">ลำดับที่</th>
            <th className="py-2 px-4 bg-gray-200">ประเภทเหล็กเส้น</th>
            <th className="py-2 px-4 bg-gray-200">หน่วย</th>
            <th className="py-2 px-4 bg-gray-200">ราคา</th>
          </tr>
        </thead>
        <tbody>
          {items2.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.type}</td>
              <td className="py-2 px-4 border-b">{item.unit}</td>
              <td className="py-2 px-4 border-b">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200">ลำดับที่</th>
            <th className="py-2 px-4 bg-gray-200">ประเภทกกระดาษ</th>
            <th className="py-2 px-4 bg-gray-200">หน่วย</th>
            <th className="py-2 px-4 bg-gray-200">ราคา</th>
          </tr>
        </thead>
        <tbody>
          {items3.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.type}</td>
              <td className="py-2 px-4 border-b">{item.unit}</td>
              <td className="py-2 px-4 border-b">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/12">
            <h3 className="text-2xl font-bold mb-4 flex justify-center">
              เพิ่มสินค้าลงตะกร้า
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">ประเภทสินค้า</label>
              <select
                className="block w-full p-2 border rounded"
                onChange={(e) => {
                  const selectedItem = [...items1, ...items2, ...items3].find(
                    (item) => item.type === e.target.value
                  );
                  setSelectedItem(selectedItem);
                }}
              >
                <option value="">เลือกประเภทสินค้า</option>
                {[...items1, ...items2, ...items3].map((item) => (
                  <option key={item.id} value={item.type}>
                    {item.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">จำนวน</label>
              <input
                type="number"
                className="block w-full p-2 border rounded"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-red-700 mr-2"
                onClick={() => setOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700"
                onClick={addItemToCart}
              >
                เพิ่ม
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
