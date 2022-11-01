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
  const customHeaderPages = ["/login", "/register", "/otp"];

  // Pages with custom background
  const customBgPages = ["/register", "/otp"];

  if (customHeaderPages.includes(location.pathname)) {
    customClassNames += "custom-header ";
    RenderHeader = <HeaderBasic />;
  } else {
    RenderHeader = <Header />;
  }

  if (customBgPages.includes(location.pathname)) {
    customClassNames += "custom-bg ";
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
