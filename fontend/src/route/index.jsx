import { lazy } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const MainContainer = lazy(() => import("../layouts/MainContainer"));
const OrderForm = lazy(() => import("../features/components/OrderForm"));
const CartForm = lazy(() => import("../features/components/CartForm"));
const BuyForm = lazy(() => import("../features/components/BuyForm"));

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/buy", element: <BuyForm /> },
      { path: "/cart", element: <CartForm /> },
      { path: "/orders", element: <OrderForm /> },
    ],
  },

  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

export default function Router() {
  return <RouterProvider router={route} />;
}
