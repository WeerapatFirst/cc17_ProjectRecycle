import { lazy } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import AdminAddProduct from "../features/components/adminAddProductForm";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const MainContainer = lazy(() => import("../layouts/MainContainer"));
const CartForm = lazy(() => import("../features/components/CartForm"));
const BuyForm = lazy(() => import("../features/components/BuyForm"));
const OrderHistoryForm = lazy(() =>
  import("../features/components/OrderHistoryForm")
);

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/buy", element: <BuyForm /> },
      { path: "/cart", element: <CartForm /> },
      { path: "/orders", element: <OrderHistoryForm /> },
      { path: "/admin", element: <AdminPage /> },
      { path: "/admin/add-product", element: <AdminAddProduct /> },
    ],
  },

  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

export default function Router() {
  return <RouterProvider router={route} />;
}
