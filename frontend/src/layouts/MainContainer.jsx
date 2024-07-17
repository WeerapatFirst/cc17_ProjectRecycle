import { Outlet } from "react-router-dom";
// import Footer from "./Footer";
import Header from "./Header";
// import Content from "./Content";
// import Footer from "./Footer";

export default function MainContainer() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
