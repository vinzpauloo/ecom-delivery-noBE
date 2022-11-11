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
import Profile from "./pages/Account/Profile";
import ResetPassword from "./pages/Account/ResetPassword";
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

            {/* Account dashboard routes */}
            <Route path="account">
              <Route index element={<Profile />} />
              <Route path="for-delivery" element={<Delivery />} />
              <Route path="order-history" element={<History />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  </AuthProvider>
  // </React.StrictMode>
);
