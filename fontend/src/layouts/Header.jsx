import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import RecycleIcon from "../icons";

export default function Header() {
  const { logout, authUser } = useAuth();
  // console.log(authUser);
  return (
    <nav className="bg-white shadow-2xl">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center text-green-600 font-serif font-bold text-[50px] gap-2 ">
          <RecycleIcon />
          <Link to="/">Recycle</Link>
        </div>

        {authUser && authUser.isAdmin ? (
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-400 hover:text-green-700 p-4 font-semibold"
            >
              หน้าหลัก
            </Link>
            <Link
              to="/buy"
              className="text-gray-400 hover:text-green-700 p-4 font-semibold"
            >
              รับซื้อ
            </Link>
            <Link
              to="/cart"
              className="text-gray-400 hover:text-green-700 p-4 font-semibold"
            >
              ตะกร้า
            </Link>
            <Link
              to="/orders"
              className="text-gray-400 hover:text-green-700 p-4 font-semibold"
            >
              ประวัติการสั่งซื้อ
            </Link>
            <Link
              to="/admin"
              className="text-gray-400 hover:text-green-700 p-4 font-semibold"
            >
              ประวัติการสั่งซื้อUser
            </Link>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-400 hover:text-green-700 p-4 font-semibold"
            >
              หน้าหลัก
            </Link>
            <Link
              to="/buy"
              className="text-gray-400 hover:text-green-700 p-4 font-semibold"
            >
              รับซื้อ
            </Link>
            <Link
              to="/cart"
              className="text-gray-400 hover:text-green-700 p-4 font-semibold"
            >
              ตะกร้า
            </Link>
            <Link
              to="/orders"
              className="text-gray-400 hover:text-green-700 p-4 font-semibold"
            >
              ประวัติการสั่งซื้อ
            </Link>
          </div>
        )}

        {authUser ? (
          <div className="flex">
            <button className="font-serif text-gray-400 px-4 py-2 mr-1 rounded-lg text-lg hover:text-green-900">
              คุณ: {authUser.firstname}
            </button>
            <Link to="/">
              <button
                onClick={() => logout()}
                className="bg-green-500 text-white px-4 py-2 mr-1 rounded-lg text-lg hover:bg-green-700"
              >
                ล็อกเอ้า
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex">
            <Link to="/register">
              <button className="bg-green-500 text-white px-4 py-2 mr-1 rounded-lg text-lg hover:bg-green-700">
                สมัครสมาชิก
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-700">
                ล็อกอิน
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
