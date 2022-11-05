import React from "react";
import "./FooterMobile.scss";
import { Link } from "react-router-dom";

import HelmetIcon from "../assets/images/helmet.png";
import RiderIcon from "../assets/images/delivery.png";
import HistoryIcon from "../assets/images/history.png";
import LockIcon from "../assets/images/lock.png";

function FooterMobile() {
  return (
    <footer>
      <a>
        <img src={HelmetIcon} alt="" />
      </a>
      <a>
        <img src={RiderIcon} alt="" />
      </a>
      <a>
        <img src={HistoryIcon} alt="" />
      </a>
      <a>
        <img src={LockIcon} alt="" />
      </a>
    </footer>
  );
}

export default FooterMobile;
