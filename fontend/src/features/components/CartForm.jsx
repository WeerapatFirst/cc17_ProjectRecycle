import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import orderApi from "../../apis/order";
import productApi from "../../apis/product";
import useUser from "../../hooks/useUser";

// วันที่ 13-06-67 ทดสอบ+แก้ไข
export default function CartForm() {
  const location = useLocation();
  const [cart, setCart] = useState(
    location.state?.cart.map((item) => ({
      ...item,
      productId: item.id, // แมปค่า productId จาก id (ถ้า id เป็นตัวยืนยัน ของ product)
    })) || []
  );

  const [deliveryDate, setDeliveryDate] = useState("");
  const [address, setAddress] = useState("");
  const { authUser: user } = useUser();
  const navigate = useNavigate();

  // วันที่ 13-06-67 ใช้ดึงข้อมูลสินค้าที่แอดมาโชว์หน้าตะกร้า
  // useEffect(() => {
  //   const fetchCartProducts = async () => {
  //     try {
  //       const response = await productApi.getCartProducts(user.id);
  //       setCart(response.data);
  //     } catch (error) {
  //       console.error("ดึงข้อมูลสินค้าไม่ได้:", error);
  //     }
  //   };

  //   fetchCartProducts();
  // }, [user.id]);

  // useEffect(() => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) => ({
  //       ...item,
  //       productId: item.id || item.productId, // ตรวจสอบ productId
  //     }))
  //   );
  // }, [location.state?.cart]);

  const removeItem = async (index) => {
    const itemToRemove = cart[index];

    try {
      // ลบสินค้าจาก database โดยใช้ productId
      await productApi.deleteProduct(itemToRemove.id);

      // อัปเดต cart หลังจากลบสินค้า
      const newCart = cart.filter((_, i) => i !== index);
      setCart(newCart);

      // แจ้งเตือน
      alert(`ลบสินค้าในฐานข้อมูลสำเร็จ: ${itemToRemove.type}`);
    } catch (error) {
      console.error("ลบสินค้าไม่สำเร็จ:", error);
      alert("ลบสินค้าไม่สำเร็จ");
    }
  };

  // วันที่ 13-06-67 ใช้ปัจจบัน
  // const handleOrderSubmit = async () => {
  //   const orderData = {
  //     userId: user.id,
  //     items: cart.map((item) => ({
  //       productId: item.productId || item.id,
  //       quantity: item.quantity || item.weight,
  //     })),
  //     deliveryDate,
  //     address,
  //   };

  //   try {
  //     await orderApi.createOrder(orderData);
  //     alert("สั่งซื้อสินค้าสำเร็จ");
  //     setCart([]); //ล้างตะกร้าหลังจากกดยืนยันสั่งซื้อ
  //     navigate("/orders"), { state: { order: orderData } };
  //   } catch (error) {
  //     console.error("ยืนยันไม่สำเร็จ:", error);
  //     alert("ยืนยันไม่สำเร็จ กรุณากรอกวันเวลาและที่อยู่ให้ครบ");
  //   }
  // };

  // ทดสอบ 14-06-67
  const handleOrderSubmit = async () => {
    const orderData = {
      userId: user.id,
      items: cart.map((item) => ({
        productId: item.productId || item.id,
        quantity: parseInt(item.quantity || item.weight), // quantity ควรเป็นจำนวนเต็ม
      })),
      deliveryDate,
      address,
    };

    try {
      await orderApi.createOrder(orderData);
      alert("สั่งซื้อสินค้าสำเร็จ");
      setCart([]); // ล้างตะกร้าหลังจากสั่งซื้อสำเร็จ
      navigate("/orders");
    } catch (error) {
      console.error("สั่งซื้อไม่สำเร็จ:", error);
      alert("สั่งซื้อไม่สำเร็จ");
    }
  };

  return (
    <section className="container mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-4 text-center">ตะกร้าสินค้า</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200">ลำดับที่</th>
            <th className="py-2 px-4 bg-gray-200">ประเภทสินค้า</th>
            {/* <th className="py-2 px-4 bg-gray-200">หน่วย</th> */}
            <th className="py-2 px-4 bg-gray-200">จำนวน</th>
            <th className="py-2 px-4 bg-gray-200">ราคา</th>
            <th className="py-2 px-4 bg-gray-200">รวม</th>
            <th className="py-2 px-4 bg-gray-200">ลบ</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              {/* <td className="py-2 px-4 border-b">กก.</td> */}
              <td className="py-2 px-4 border-b">{item.weight} กก.</td>
              <td className="py-2 px-4 border-b">{item.price}</td>
              <td className="py-2 px-4 border-b">{item.weight * item.price}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white px-1 rounded-md"
                  onClick={() => removeItem(index)}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <label className="block text-gray-700 mb-2 font-bold text-lg">
          วันเวลาที่รับสินค้า
        </label>
        <input
          type="datetime-local"
          className="block w-auto p-2 border rounded mb-4"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />

        <label className="block text-gray-700 mb-2">กรุณากรอกที่อยู่</label>
        <textarea
          className="block w-full p-2 border rounded mb-4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700"
          onClick={handleOrderSubmit}
        >
          ยืนยันการสั่งซื้อ
        </button>
      </div>
    </section>
  );
}

// วันที่ 13-06-67
// export default function CartForm() {
//   const location = useLocation();

//   const [cart, setCart] = useState(
//     location.state?.cart.map((item) => ({
//       ...item,
//       productId: item.id,
//     })) || []
//   );

//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [address, setAddress] = useState("");
//   const { authUser: user } = useUser();

//   const navigate = useNavigate();

//   useEffect(() => {
//     setCart((prevCart) =>
//       prevCart.map((item) => ({
//         ...item,
//         productId: item.id || item.productId,
//       }))
//     );
//   }, [location.state?.cart]);

//   const removeItem = async (index) => {
//     const itemToRemove = cart[index];

//     try {
//       // ลบสินค้าจาก database โดยใช้ productId
//       await productApi.deleteProduct(itemToRemove.productId);

//       // อัปเดต cart หลังจากลบสินค้า
//       const newCart = cart.filter((_, i) => i !== index);
//       setCart(newCart);

//       alert(`ลบสินค้าสำเร็จ: ${itemToRemove.type}`);
//     } catch (error) {
//       console.error("ลบสินค้าไม่สำเร็จ:", error);
//       alert("ลบสินค้าไม่สำเร็จ");
//     }
//   };

//   const handleOrderSubmit = async () => {
//     const orderData = {
//       userId: user.id,
//       items: cart.map((item) => ({
//         productId: item.productId,
//         quantity: item.quantity,
//       })),
//       deliveryDate,
//       address,
//     };

//     try {
//       await orderApi.createOrder(orderData);
//       alert("สั่งซื้อสินค้าสำเร็จ");
//       setCart([]);
//       navigate("/");
//     } catch (error) {
//       console.error("สั่งซื้อไม่สำเร็จ:", error);
//       alert("สั่งซื้อไม่สำเร็จ");
//     }
//   };

//   return (
//     <section className="container mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-4xl font-bold mb-4 text-center">ตะกร้าสินค้า</h2>
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 bg-gray-200">ลำดับที่</th>
//             <th className="py-2 px-4 bg-gray-200">ประเภทสินค้า</th>
//             <th className="py-2 px-4 bg-gray-200">หน่วย</th>
//             <th className="py-2 px-4 bg-gray-200">จำนวน</th>
//             <th className="py-2 px-4 bg-gray-200">ราคา</th>
//             <th className="py-2 px-4 bg-gray-200">รวม</th>
//             <th className="py-2 px-4 bg-gray-200">ลบ</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cart.map((item, index) => (
//             <tr key={index} className="text-center">
//               <td className="py-2 px-4 border-b">{index + 1}</td>
//               <td className="py-2 px-4 border-b">{item.type}</td>
//               <td className="py-2 px-4 border-b">{item.unit}</td>
//               <td className="py-2 px-4 border-b">{item.quantity}</td>
//               <td className="py-2 px-4 border-b">{item.price}</td>
//               <td className="py-2 px-4 border-b">
//                 {item.quantity * item.price}
//               </td>
//               <td className="py-2 px-4 border-b">
//                 <button
//                   className="bg-red-500 text-white px-1 rounded-md"
//                   onClick={() => removeItem(index)}
//                 >
//                   ลบ
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mt-6">
//         <label className="block text-gray-700 mb-2 font-bold text-lg">
//           วันเวลาที่รับสินค้า
//         </label>
//         <input
//           type="datetime-local"
//           className="block w-auto p-2 border rounded mb-4"
//           value={deliveryDate}
//           onChange={(e) => setDeliveryDate(e.target.value)}
//         />

//         <label className="block text-gray-700 mb-2">กรุณากรอกที่อยู่</label>
//         <textarea
//           className="block w-full p-2 border rounded mb-4"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//       </div>

//       <div className="flex justify-end">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700"
//           onClick={handleOrderSubmit}
//         >
//           ยืนยันการสั่งซื้อ
//         </button>
//       </div>
//     </section>
//   );
// }

// ใช้ปัจจุบัน 12-06-67
// export default function CartForm() {
//   const location = useLocation();

//   const [cart, setCart] = useState(
//     location.state?.cart.map((item) => ({
//       ...item,
//       productId: item.id, // แมปค่า productId จาก id (ถ้า id เป็นตัวยืนยัน ของ product)
//     })) || []
//   );

//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [address, setAddress] = useState("");
//   const { authUser: user } = useUser();

//   const navigate = useNavigate();

//   useEffect(() => {
//     setCart((prevCart) =>
//       prevCart.map((item) => ({
//         ...item,
//         productId: item.id || item.productId, // ตรวจสอบ productId
//       }))
//     );
//   }, [location.state?.cart]);

//   // ใช้ปัจุบัน
//   // const removeItem = (index) => {
//   //   const newCart = cart.filter((_, i) => i !== index);
//   //   setCart(newCart);
//   // };

//   // วันที่ 13-06-67 ลบสินค้า
//   // const removeItem = async (index) => {
//   //   const itemToRemove = cart[index];
//   //   // const newCart = cart.filter((_, i) => i !== index);
//   //   // setCart(newCart);

//   //   // ทำการลบสินค้าออกจากฐานข้อมูล
//   //   try {
//   //     await productApi.deleteProduct(itemToRemove.productId);

//   //     const newCart = cart.filter((_, i) => i !== index);
//   //     setCart(newCart);
//   //   } catch (error) {
//   //     console.error("ลบสินค้าไม่สำเร็จ:", error);
//   //   }
//   // };

//   const removeItem = async (index) => {
//     const itemToRemove = cart[index];

//     try {
//       // ลบสินค้าจาก database โดยใช้ productId
//       await productApi.deleteProduct(itemToRemove.productId);

//       // อัปเดต cart หลังจากลบสินค้า
//       const newCart = cart.filter((_, i) => i !== index);
//       setCart(newCart);

//       // แจ้งเตือน
//       alert(`ลบสินค้าในฐานข้อมูลไม่สำเร็จ: ${itemToRemove.type}`);
//     } catch (error) {
//       console.error("ลบสินค้าไม่สำเร็จ:", error);
//       alert("ลบสินค้าไม่สำเร็จ");
//     }
//   };

//   // วันที่ 12-06-67 ใช้ปัจจุบัน
//   // const handleOrderSubmit = async () => {
//   //   const orderData = {
//   //     userId: user.id,
//   //     items: cart.map((item) => ({
//   //       productId: item.productId, // ใช้ productId ในการสั่ง
//   //       quantity: item.quantity,
//   //     })),
//   //     deliveryDate,
//   //     address,
//   //   };

//   //   // ตรวจสอบว่า productId มีค่าไหม
//   //   for (const item of orderData.items) {
//   //     if (!item.productId) {
//   //       alert("มีสินค้าไม่พบ ID");
//   //       return;
//   //     }
//   //   }

//   //   try {
//   //     await orderApi.createOrder(orderData);
//   //     alert("สั่งซื้อสินค้าสำเร็จ");
//   //     setCart([]); // ล้างตะกร้าสินค้าหลังจากสั่งซื้เสร็จ
//   //     navigate("/"); // ไปยังหน้าหลัก
//   //   } catch (error) {
//   //     console.error("เกิดข้อผิดพลาดในการสั่งซื้อ:", error);
//   //     alert("เกิดข้อผิดพลาดในการสั่งซื้อ");
//   //   }
//   // };

//   // วันที่ 13-06-67
//   const handleOrderSubmit = async () => {
//     const orderData = {
//       userId: user.id,
//       items: cart.map((item) => ({
//         productId: item.productId,
//         quantity: item.quantity,
//       })),
//       deliveryDate,
//       address,
//     };

//     try {
//       await orderApi.createOrder(orderData);
//       alert("สั่งซื้อสินค้าสำเร็จ");
//       setCart([]);
//       navigate("/");
//     } catch (error) {
//       console.error("สั่งซื้อไม่สำเร็จ:", error);
//       alert("สั่งซื้อไม่สำเร็จ");
//     }
//   };

//   return (
//     <section className="container mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-4xl font-bold mb-4 text-center">ตะกร้าสินค้า</h2>
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 bg-gray-200">ลำดับที่</th>
//             <th className="py-2 px-4 bg-gray-200">ประเภทสินค้า</th>
//             <th className="py-2 px-4 bg-gray-200">หน่วย</th>
//             <th className="py-2 px-4 bg-gray-200">จำนวน</th>
//             <th className="py-2 px-4 bg-gray-200">ราคา</th>
//             <th className="py-2 px-4 bg-gray-200">รวม</th>
//             <th className="py-2 px-4 bg-gray-200">ลบ</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cart.map((item, index) => (
//             <tr key={index} className="text-center">
//               <td className="py-2 px-4 border-b">{index + 1}</td>
//               <td className="py-2 px-4 border-b">{item.type}</td>
//               <td className="py-2 px-4 border-b">{item.unit}</td>
//               <td className="py-2 px-4 border-b">{item.quantity}</td>
//               <td className="py-2 px-4 border-b">{item.price}</td>
//               <td className="py-2 px-4 border-b">
//                 {item.quantity * item.price}
//               </td>
//               <td className="py-2 px-4 border-b">
//                 <button
//                   className="bg-red-500 text-white px-1 rounded-md"
//                   onClick={() => removeItem(index)}
//                 >
//                   ลบ
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mt-6">
//         <label className="block text-gray-700 mb-2 font-bold text-lg">
//           วันเวลาที่รับสินค้า
//         </label>
//         <input
//           type="datetime-local"
//           className="block w-auto p-2 border rounded mb-4"
//           value={deliveryDate}
//           onChange={(e) => setDeliveryDate(e.target.value)}
//         />

//         <label className="block text-gray-700 mb-2">กรุณากรอกที่อยู่</label>
//         <textarea
//           className="block w-full p-2 border rounded mb-4"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//       </div>

//       <div className="flex justify-end">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700"
//           onClick={handleOrderSubmit}
//         >
//           ยืนยันการสั่งซื้อ
//         </button>
//       </div>
//     </section>
//   );
// }
