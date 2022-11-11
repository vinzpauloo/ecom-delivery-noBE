import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import FooterMobile from "./components/FooterMobile";

// Set axios defaults
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Accept"] = process.env.REACT_APP_HEADER_ACCEPT;

type Props = {};

const App: React.FC = (props: Props) => {
  const location = useLocation();
  let RenderHeader;
  let RenderFooter;
  let customClassNames = "";

  // Pages with custom header
  const customHeaderPages = ["/registration", "/registration2", "/otp"];

  // Pages with custom footer
  const customFooterPages = [
    "/account",
    "/account/for-delivery",
    "/account/order-history",
    "/account/reset-password",
  ];

  // Pages with custom background
  const customBgPages = ["/registration", "/otp", "/otp-order"];

  // Pages with no footer on mobile
  const noFooterOnMobile = ["/registration"];

  if (
    customHeaderPages.includes(location.pathname) &&
    window.outerWidth <= 768
  ) {
    customClassNames += "no-header";
    RenderHeader = <></>;
  } else {
    RenderHeader = <Header />;
  }

  if (
    customFooterPages.includes(location.pathname) &&
    window.outerWidth <= 768
  ) {
    customClassNames += "custom-footer ";
    RenderFooter = <FooterMobile />;
  } else {
    RenderFooter = <Footer />;
  }

  // if (customBgPages.includes(location.pathname)) {
  //   customClassNames += "custom-bg ";
  // }

  /* Checking if the current path is in the array of paths that have no footer on mobile. If it is, it
 adds the class `no-footer-on-mobile` to the `customClassNames` variable. */
  if (noFooterOnMobile.includes(location.pathname)) {
    customClassNames += "no-footer-on-mobile ";
  }

  return (
    <>
      <div className={customClassNames}>
        {RenderHeader}
        <Outlet />
        {RenderFooter}
      </div>
    </>
  );
};

export default App;
