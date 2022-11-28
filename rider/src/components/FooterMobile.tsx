import React from "react";
import "./FooterMobile.scss";
import { Link } from "react-router-dom";

import HelmetIcon from "../assets/images/helmet.png";
import RiderIcon from "../assets/images/delivery.png";
import HistoryIcon from "../assets/images/history.png";
import LockIcon from "../assets/images/lock.png";

const FooterMobile = () => {
  return (
    <footer className="fixed-bottom">
      <a href="/account">
        <img src={HelmetIcon} alt="" />
      </a>
      <a href="/account/for-delivery">
        <img src={RiderIcon} alt="" />
      </a>
      <a href="/account/order-history">
        <img src={HistoryIcon} alt="" />
      </a>
      <a href="/account/reset-password">
        <img src={LockIcon} alt="" />
      </a>
    </footer>
  );
};

export default FooterMobile;
