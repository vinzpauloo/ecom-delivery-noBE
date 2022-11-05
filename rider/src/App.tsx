import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import FooterMobile from "./components/FooterMobile";

type Props = {};

const App: React.FC = (props: Props) => {
  const location = useLocation();
  return (
    <>
      {/* Different header layout on signup page */}
      <div className={`${location.pathname == "/login" ? "signupPage" : ""}`}>
        <Header />
        <Outlet />
        {/* <Footer /> */}
        <FooterMobile />
      </div>
    </>
  );
};

export default App;
