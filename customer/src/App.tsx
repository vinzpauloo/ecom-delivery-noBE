import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.scss";

import Header from "./components/Header/Header";
import HeaderBasic from "./components/Header/HeaderBasic";
import Footer from "./components/Footer";

type Props = {};

const App: React.FC = (props: Props) => {
  const location = useLocation();
  let RenderHeader;
  let customClassNames = "";

  // Pages with custom header
  const customHeaderPages = ["/login", "/register", "/otp", "/otp-order"];

  // Pages with custom background
  const customBgPages = ["/register", "/otp", "/otp-order"];

  // Pages with no footer on mobile
  const noFooterOnMobile = ["/restaurant"];

  if (customHeaderPages.includes(location.pathname)) {
    customClassNames += "custom-header ";
    RenderHeader = <HeaderBasic />;
  } else {
    RenderHeader = <Header />;
  }

  // if (customBgPages.includes(location.pathname)) {
  //   customClassNames += "custom-bg ";
  // }

  if (noFooterOnMobile.includes(location.pathname)) {
    customClassNames += "no-footer-on-mobile ";
  }

  return (
    <>
      <div className={customClassNames}>
        {RenderHeader}
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default App;
