import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import RecycleIcon from "../icons";

export default function Header() {
  const { logout, authUser } = useAuth();
  // console.log(authUser);
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center text-green-500 font-bold text-3xl gap-2 animate-pulse">
          <RecycleIcon />
          Recycle
        </div>
        {/* Middle Links */}
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            หน้าหลัก
          </Link>
          <Link to="/buy" className="text-gray-700 hover:text-gray-900">
            รับซื้อ
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-gray-900">
            ตะกร้า
          </Link>
          <Link to="/orders" className="text-gray-700 hover:text-gray-900">
            ประวัติการสั่งซื้อ
          </Link>
        </div>
        {/* Right Button */}

        {authUser ? (
          <button
            onClick={() => logout()}
            className="bg-blue-500 text-white px-4 py-2 mr-1 rounded-lg text-lg hover:bg-blue-700"
          >
            ล็อกเอ้า
          </button>
        ) : (
          <div>
            <Link to="/register">
              <button className="bg-blue-500 text-white px-4 py-2 mr-1 rounded-lg text-lg hover:bg-blue-700">
                สมัครสมาชิก
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700">
                ล็อกอิน
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
