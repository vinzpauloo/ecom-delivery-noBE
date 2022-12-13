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
import HistoryStatusCompleted from "./pages/Account/HistoryStatusCompleted";
import HistoryStatusCancelled from "./pages/Account/HistoryStatusCancelled";
import NewOrder from "./pages/Account/NewOrder";
import OrderDetails from "./pages/Account/OrderDetails";
import ResetPassword from "./pages/Account/ResetPassword";
import RestaurantFeedback from "./pages/Account/RestaurantFeedback";
import Flavor from "./pages/Account/Flavor";
import { AuthContextProvider } from "./context/AuthContext";
import { AuthProvider } from "react-auth-kit";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPassword2 from "./pages/ForgotPassword2";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
  <AuthProvider authType="localstorage" authName="_auth">
    {/* <AuthContextProvider> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="registration" element={<Registration />} />
          <Route path="otp" element={<Otp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="forgot-password2" element={<ForgotPassword2 />} />

          {/* Account dashboard routes */}
          <Route path="account">
            {/* My Account Page */}
            <Route index element={<Profile />} />
            <Route path="feedback/:id" element={<RestaurantFeedback />} />
            <Route path="reset-password" element={<ResetPassword />} />

            {/* For Delivery Page */}
            <Route path="for-delivery" element={<Order />} />
            <Route path="for-delivery/:id" element={<NewOrder />} />
            <Route
              path="for-delivery/completed/:id"
              element={<HistoryStatusCompleted />}
            />
            <Route
              path="for-delivery/cancelled/:id"
              element={<HistoryStatusCancelled />}
            />

            {/* Menu Page */}
            <Route path="my-restaurant-menu" element={<Product />} />

            {/* Order History Page */}
            <Route path="order-history" element={<History />} />
            <Route path="order-history/:id" element={<OrderDetails />} />
            <Route
              path="order-history/completed/:id"
              element={<HistoryStatusCompleted />}
            />
            <Route
              path="order-history/cancelled/:id"
              element={<HistoryStatusCancelled />}
            />

            {/* Flavor Page */}
            <Route path="flavors" element={<Flavor />} />

            {/* Order Notification Page */}
            <Route path="order">
              <Route index element={<Order />} />
              <Route path="status/:id" element={<Status />} />
              <Route path="order-information" element={<OrderInformation />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>

  // </React.StrictMode>
);
