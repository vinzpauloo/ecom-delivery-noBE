import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Otp from "./pages/Otp";
import Profile from "./pages/Account/Profile";
import Product from "./pages/Account/Product";
import Order from "./pages/Account/Order";
import Status from "./pages/Account/Status";
import OrderInformation from "./pages/Account/OrderInformation";
import History from "./pages/Account/History";
import OrderDetails from "./pages/Account/OrderDetails";
import ResetPassword from "./pages/Account/ResetPassword";
import { AuthContextProvider } from "./context/AuthContext";
import { AuthProvider } from "react-auth-kit";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider authType="localstorage" authName="_auth">
      {/* <AuthContextProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="registration" element={<Registration />} />
            <Route path="otp" element={<Otp />} />

            {/* Account dashboard routes */}
            <Route path="account">
              <Route index element={<Profile />} />
              <Route path="for-delivery" element={<Order />} />
              <Route path="order">
                <Route index element={<Order />} />
                <Route path="status/:id" element={<Status />} />
                <Route
                  path="order-information"
                  element={<OrderInformation />}
                />
              </Route>
              <Route path="my-restaurant-menu" element={<Product />} />
              <Route path="order-history" element={<History />} />
              <Route path="order-history/:id" element={<OrderDetails />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    {/* </AuthContextProvider> */}
  </React.StrictMode>
);
