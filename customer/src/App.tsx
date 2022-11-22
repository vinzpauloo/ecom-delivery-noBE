import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.scss";

import Header from "./components/Header/Header";
import HeaderBasic from "./components/Header/HeaderBasic";
import Footer from "./components/Footer";
import FooterBasic from "./components/FooterBasic";

// Set axios defaults
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Accept"] = process.env.REACT_APP_HEADER_ACCEPT;

type Props = {};

const App: React.FC = (props: Props) => {
  const location = useLocation();
  let RenderHeader, RenderFooter;
  let customClassNames = "";

  // Pages with custom header
  const customHeaderPages = ["/login", "/register", "/otp"];

  // Pages with custom footer
  const customFooterPages = ["/login"];

  // Pages with custom background
  const customBgPages = [""];

  // Pages with no footer on mobile
  const noFooterOnMobile = [/^\/restaurants\/\d+$/];

  if (customHeaderPages.includes(location.pathname)) {
    customClassNames += "custom-header ";
    RenderHeader = <HeaderBasic />;
  } else {
    RenderHeader = <Header />;
  }

  if (customFooterPages.includes(location.pathname)) {
    customClassNames += "custom-footer ";
    RenderFooter = <FooterBasic />;
  } else {
    RenderFooter = <Footer />;
  }

  if (customBgPages.includes(location.pathname)) {
    customClassNames += "custom-bg ";
  }

  if (noFooterOnMobile.some((rx) => rx.test(location.pathname))) {
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
