import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Registration2 from "./pages/Registration2";
import Otp from "./pages/Otp";
import OtpOrder from "./pages/OtpOrder";
import Delivery from "./pages/Account/Delivery";
import History from "./pages/Account/History";
import OrderDetails from "./pages/Account/OrderDetails";
import Profile from "./pages/Account/Profile";
import Rewards from "./pages/Account/Rewards";
import Statistics from "./pages/Account/Statistics";
import ResetPassword from "./pages/Account/ResetPassword";
import Order from "./pages/Account/Order";
import RiderTracker from "./pages/Account/RiderTracker";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPassword2 from "./pages/ForgotPassword2";
// import { AuthContextProvider } from "./context/AuthContext";
import { AuthProvider } from "react-auth-kit";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
  <AuthProvider authType="localstorage" authName="_auth">
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="registration" element={<Registration />} />
            <Route path="registration2" element={<Registration2 />} />
            <Route path="otp" element={<Otp />} />
            <Route path="otp-order" element={<OtpOrder />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-password2" element={<ForgotPassword2 />} />

            {/* Account dashboard routes */}
            <Route path="account">
              <Route index element={<Profile />} />
              <Route path="for-delivery" element={<Delivery />} />
              <Route path="for-delivery/order/:id" element={<Order />} />
              <Route path="orders/:id/otw" element={<RiderTracker />} />
              <Route path="order-history" element={<History />} />
              <Route path="order-history/:id" element={<OrderDetails />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="statistics" element={<Statistics />} />
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  </AuthProvider>
  // </React.StrictMode>
);
