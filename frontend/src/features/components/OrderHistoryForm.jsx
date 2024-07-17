import { useEffect, useState } from "react";
import orderApi from "../../apis/order";
import useUser from "../../hooks/useUser";

export default function OrderHistoryForm() {
  const { authUser: user } = useUser();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Fetch ดึงประวัติสั่งซื้อ
    const fetchOrderHistory = async () => {
      try {
        const response = await orderApi.getOrderHistory(user.id);
        setOrderHistory(response.data);
      } catch (error) {
        console.error("ไม่สามารถดึงข้อมูลได้:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <section className="container mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-4 text-center">
        ประวัติการสั่งซื้อ
      </h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200">รหัสสั่งซื้อ</th>
            <th className="py-2 px-4 bg-gray-200">รายการสินค้า</th>
            <th className="py-2 px-4 bg-gray-200">น้ำหนัก</th>
            <th className="py-2 px-4 bg-gray-200">ราคารวม</th>
            <th className="py-2 px-4 bg-gray-200">วันเวลา</th>
            <th className="py-2 px-4 bg-gray-200">ที่อยู่</th>
            <th className="py-2 px-4 bg-gray-200">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((order) => (
            <tr key={order.id} className="text-center">
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">
                {order.cart.cartItem
                  .map((item) => item.product.name)
                  .join(", ")}
              </td>
              <td className="py-2 px-4 border-b">
                {order.cart.cartItem.map((item) => item.quantity).join(", ")}
              </td>
              <td className="py-2 px-4 border-b">
                {order.cart.cartItem.reduce(
                  (total, item) => total + item.quantity * item.product.price,
                  0
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(order.pickupTime).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">{order.address}</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
