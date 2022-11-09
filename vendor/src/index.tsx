import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Otp from "./pages/Otp";
import Profile from "./pages/Account/Profile";
import Menu from "./pages/Account/Menu";
import History from "./pages/Account/History";
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
              <Route path="my-restaurant-menu" element={<Menu />} />
              <Route path="order-history" element={<History />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    {/* </AuthContextProvider> */}
  </React.StrictMode>
);
