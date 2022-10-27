import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Otp from "./pages/Otp";
import OtpOrder from "./pages/OtpOrder";
import Restaurant from "./pages/Restaurant";
import Checkout from "./pages/Checkout";
import OrderTracker from "./pages/OrderTracker";
import Restaurants from "./pages/Restaurants";
import Profile from "./pages/Account/Profile";
import OrderHistory from "./pages/Account/OrderHistory";
import ResetPassword from "./pages/Account/ResetPassword";
import { AuthContextProvider } from "./context/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
              <Route path="otp" element={<Otp />} />
              <Route path="otp-order" element={<OtpOrder />} />
              <Route path="restaurant" element={<Restaurant />} />
              <Route path="restaurants" element={<Restaurants />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="delivery-status" element={<OrderTracker />} />

              {/* Account dashboard routes */}
              <Route path="account">
                <Route index element={<Profile />} />
                <Route path="order-history" element={<OrderHistory />} />
                <Route path="reset-password" element={<ResetPassword />} />
              </Route>
            </Route>
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
