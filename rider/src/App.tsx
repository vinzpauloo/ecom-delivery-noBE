import React, { useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./App.scss";

import Header from "./components/Header/Header";
import HeaderBasic from "./components/Header/HeaderBasic";
import Footer from "./components/Footer";
import FooterMobile from "./components/FooterMobile";
import { Col, Row } from "react-bootstrap";
import monkey from "./assets/images/monkey.png";

// Set axios defaults
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Accept"] = process.env.REACT_APP_HEADER_ACCEPT;

type Props = {};

const App: React.FC = (props: Props) => {
  const [notification, setNotification] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  let RenderHeader;
  let RenderFooter;
  let customClassNames = "";

  // Pages with custom header
  // const customHeaderPages = ["/registration", "/registration2", "/otp"];
  const customHeaderPages = ["/registration", "/registration2", "/otp"];

  const customHeaderPages2 = ["/", "/forgot-password", "/forgot-password2"];

  // Pages with custom footer
  const customFooterPages = [
    "/account",
    "/account/for-delivery",
    "/account/order-history",
    "/account/reset-password",
    "/account/statistics",
    `/account/feedback/${id}`,
    `/account/order-history/completed/${id}`,
  ];

  // Pages with custom background
  const customBgPages = ["/registration", "/otp", "/otp-order"];

  // Pages with no header on mobile
  const noHeaderOnMobile = ["/registration", "registration2", "otp"];

  // Pages with no footer on mobile
  const noFooterOnMobile = ["/registration"];

  if (
    customHeaderPages.includes(location.pathname) &&
    window.outerWidth <= 768
  ) {
    customClassNames += "no-header";
    RenderHeader = <></>;
  } else if (customHeaderPages2.includes(location.pathname)) {
    customClassNames += "no-header2 ";
    RenderHeader = <HeaderBasic></HeaderBasic>;
  } else {
    RenderHeader = <Header setNotification={setNotification} />;
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

  if (noHeaderOnMobile.includes(location.pathname)) {
    customClassNames += "no-header-on-mobile ";
  }

  /* Checking if the current path is in the array of paths that have no footer on mobile. If it is, it
 adds the class `no-footer-on-mobile` to the `customClassNames` variable. */
  if (noFooterOnMobile.includes(location.pathname)) {
    customClassNames += "no-footer-on-mobile ";
  }

  const handleClick = () => {
    setNotification(false);
    // navigate(`/account/for-delivery`);
    window.location.reload();
  };

  return (
    <>
      <div className={customClassNames}>
        {RenderHeader}
        <Outlet />
        <Footer />
      </div>
      <div className={`notificationContainer ${notification && "active"}`}>
        <div className="notification">
          <Col className="col-3 md-col-5">
            <img className="monkey" src={monkey} alt="" />
          </Col>
          <Col className="leftContent col-9 md-col-7">
            <Row className="header">Měiwèi de shíwù 美味的食物</Row>
            <Row className="buttonContent" onClick={handleClick}>
              NEW ORDER!
            </Row>
          </Col>
        </div>
      </div>
    </>
  );
};

export default App;
