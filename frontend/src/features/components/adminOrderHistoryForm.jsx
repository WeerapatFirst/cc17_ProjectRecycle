// 17-06-67 ใช้งานปัจจบุัน
import { useEffect, useState } from "react";
import adminApi from "../../apis/admin";
import useUser from "../../hooks/useUser";
import { toast } from "react-toastify";

export default function OrderHistoryAdmin() {
  const { authUser: user } = useUser();
  const [orderHistory, setOrderHistory] = useState([]);
  const [editOrderId, setEditOrderId] = useState(null);
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    // Fetch ดึงประวัติสั่งซื้อ
    const fetchOrderHistory = async () => {
      try {
        const response = await adminApi.getAllOrders();
        setOrderHistory(response.data);
      } catch (error) {
        console.error("ไม่สามารถดึงข้อมูลได้:", error);
      }
    };

    fetchOrderHistory();
  }, [user]);

  const handleEditClick = (orderId, currentStatus) => {
    setEditOrderId(orderId);
    setEditStatus(currentStatus);
  };

  const handleStatusChange = (event) => {
    setEditStatus(event.target.value);
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      await adminApi.updateOrder(orderId, { status: editStatus });
      setEditOrderId(null);
      setEditStatus("");
      const response = await adminApi.getAllOrders();
      setOrderHistory(response.data);

      toast.success("อัปเดตสถานะสำเร็จ");
      // alert("อัปเดตสถานะสำเร็จ");
    } catch (error) {
      console.error("อัปเดตสถานะไม่สำเร็จ:", error);
      // alert("อัปเดตสถานะไม่สำเร็จ");
      toast.error("อัปเดตสถานะไม่สำเร็จ");
    }
  };

  const handleDelete = async (orderId) => {
    const isConfirmed = window.confirm("ต้องการลบหรือไม่");
    if (isConfirmed) {
      try {
        await adminApi.deleteOrder(orderId);
        setOrderHistory(orderHistory.filter((order) => order.id !== orderId));
        // alert("ลบข้อมูลสั่งซื้อสำเร็จ");
        toast.success("ลบข้อมูลสั่งซื้อสำเร็จ");
      } catch (error) {
        console.error("ไม่สามารถลบข้อมูลได้:", error);
        // alert("ลบข้อมูลสั่งไม่ซื้อสำเร็จ");
        toast.error("ลบข้อมูลสั่งไม่ซื้อสำเร็จ");
      }
    }
  };

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
            <th className="py-2 px-4 bg-gray-200">แก้ไข</th>
            <th className="py-2 px-4 bg-gray-200">ลบ</th>
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
              {/* ทำปุ่มแก้ไข status และมีการกดยืนยันได้ */}
              <td className="py-2 px-4 border-b">
                {editOrderId === order.id ? (
                  <select value={editStatus} onChange={handleStatusChange}>
                    <option value="PENDING">PENDING</option>
                    <option value="SUCCESS">SUCCESS</option>
                  </select>
                ) : (
                  order.status
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editOrderId === order.id ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleUpdateStatus(order.id)}
                  >
                    ยืนยัน
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEditClick(order.id, order.status)}
                  >
                    แก้ไข
                  </button>
                )}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    handleDelete(order.id);
                  }}
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

// *****************************
