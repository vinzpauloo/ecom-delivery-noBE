import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import OtpOrder from "./pages/OtpOrder";
import Restaurant from "./pages/Restaurant";
import Checkout from "./pages/Checkout";
import Restaurants from "./pages/Restaurants";
import Profile from "./pages/Account/Profile";
import Orders from "./pages/Account/Orders";
import GetHash from "./pages/GetHash";
import Order from "./pages/Order";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "react-auth-kit";

// const queryClient = new QueryClient();
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
  <AuthProvider authType="localstorage" authName="_auth">
    <BrowserRouter>
      {/* <QueryClientProvider client={queryClient}> */}
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="get-hash" element={<GetHash />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="otp" element={<Otp />} />
            <Route path="otp-order" element={<OtpOrder />} />
            <Route path="restaurant" element={<Restaurant />} />

            {/* Restaurants routes */}
            <Route path="restaurants">
              <Route index element={<Navigate to="/" replace />} />
              <Route path=":type/:id" element={<Restaurants />} />
              <Route path=":id" element={<Restaurant />} />
            </Route>

            <Route path="checkout" element={<Checkout />} />
            <Route path="order/:id" element={<Order />} />

            {/* Account dashboard routes */}
            <Route path="account">
              <Route index element={<Profile />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
      {/* </QueryClientProvider> */}
    </BrowserRouter>
  </AuthProvider>
  // </React.StrictMode>
);
