import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import RecycleIcon from "../icons";
import { useEffect, useState } from "react";

const Navbar = ({ link, title, id, currentAdmin, setCurrentAdmin }) => {
  const [isSeleted, setIsSelected] = useState(false);
  useEffect(() => {
    if (id == currentAdmin) setIsSelected(true);
    else setIsSelected(false);
  }, [currentAdmin, id]);

  const handleClick = () => {
    setCurrentAdmin(id);
  };
  return (
    <Link
      onClick={handleClick}
      to={`${link}`}
      className={` ${
        isSeleted ? "text-green-700" : "text-gray-400"
      } hover:text-green-700 p-4 font-semibold`}
    >
      {`${title}`}
    </Link>
  );
};

const NavbarUser = ({ link, title, id, currentUser, setCurrentUser }) => {
  const [isSeletedUser, setIsSelectedUser] = useState(false);
  useEffect(() => {
    if (id === currentUser) setIsSelectedUser(true);
    else setIsSelectedUser(false);
  }, [currentUser, id]);

  const handleClick = () => {
    setCurrentUser(id);
  };

  return (
    <Link
      onClick={handleClick}
      to={`${link}`}
      className={`${
        isSeletedUser ? "text-green-700" : "text-gray-400"
      } hover:text-green-700 p-4 font-semibold}`}
    >
      {`${title}`}
    </Link>
  );
};

export default function Header() {
  const { logout, authUser } = useAuth();
  const [currentAdmin, setCurrentAdmin] = useState(0);
  const [currentUser, setCurrentUser] = useState(0);
  // console.log(authUser);

  const navBarContentAdmin = [
    { id: 0, link: "/", title: "หน้าหลัก" },
    { id: 1, link: "buy", title: "รับซื้อ" },
    { id: 2, link: "cart", title: "ตะกร้า" },
    { id: 3, link: "orders", title: "ประวัติการสั่งซื้อ" },
    { id: 4, link: "admin", title: "ประวัติการสั่งซื้อUser" },
    { id: 5, link: "admin/add-product", title: "แก้ไขราคารับซื้อ" },
  ];
  const navBarContentUser = [
    { id: 0, link: "/", title: "หน้าหลัก" },
    { id: 1, link: "buy", title: "รับซื้อ" },
    { id: 2, link: "cart", title: "ตะกร้า" },
    { id: 3, link: "orders", title: "ประวัติการสั่งซื้อ" },
  ];

  // admin
  const renderAdmin = navBarContentAdmin.map((el, index) => {
    return (
      <Navbar
        key={index}
        index={index}
        link={el.link}
        title={el.title}
        id={el.id}
        currentAdmin={currentAdmin}
        setCurrentAdmin={setCurrentAdmin}
      />
    );
  });

  // user
  const renderUser = navBarContentUser.map((el, index) => {
    return (
      <NavbarUser
        key={index}
        index={index}
        link={el.link}
        title={el.title}
        id={el.id}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    );
  });

  return (
    <nav className="bg-white shadow-2xl">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center text-green-600 font-serif font-bold text-[50px] gap-2 ">
          <RecycleIcon />
          <Link to="/">Recycle</Link>
        </div>

        {authUser && authUser.isAdmin ? (
          <div className="flex space-x-4">{renderAdmin}</div>
        ) : (
          <div className="flex space-x-4">
            {renderUser}
            {/* <Link
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
            </Link> */}
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
