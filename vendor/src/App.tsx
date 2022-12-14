import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.scss";

import Header from "./components/Header/Header";
import HeaderBasic from "./components/Header/HeaderBasic";
import Footer from "./components/Footer";
import { Modal, Row, Col } from "react-bootstrap";
import monkey from "./assets/images/monkey.png";

// Set axios defaults
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Accept"] = process.env.REACT_APP_HEADER_ACCEPT;

type Props = {};

const App: React.FC = (props: Props) => {
  const [notification, setNotification] = useState({
    status: false,
    id: null,
  });
  const location = useLocation();
  const navigate = useNavigate();
  let RenderHeader;
  let customClassNames = "";

  // Pages with custom header
  const customHeaderPages = [
    "/",
    "/registration",
    "/otp",
    "/forgot-password",
    "/forgot-password2",
  ];

  // Pages with custom background
  const customBgPages = ["/", "/registration", "/otp"];

  // Pages with no footer on mobile
  const noFooterOnMobile = [
    "/account",
    "/account/my-restaurant-menu",
    "/account/order-history",
    "/account/reset-password",
    "/account/for-delivery",
  ];

  if (customHeaderPages.includes(location.pathname)) {
    customClassNames += "custom-header";
    RenderHeader = <HeaderBasic />;
  } else {
    RenderHeader = <Header setNotification={setNotification} />;
  }

  if (customBgPages.includes(location.pathname)) {
    customClassNames += "custom-bg";
  }

  if (noFooterOnMobile.includes(location.pathname)) {
    customClassNames += "no-footer-on-mobile ";
  }
  const handleClick = () => {
    setNotification({ status: false, id: null });
    navigate(`/account/for-delivery/${notification.id}`);
  };
  //just comment
  return (
    <>
      <div className={customClassNames}>
        {RenderHeader}
        <Outlet />
        <Footer />
      </div>
      <div
        className={`notificationContainer ${notification.status && "active"}`}
      >
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
