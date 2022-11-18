import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";

import styles from "./NavigationMobileContent.module.scss";

import variant01 from "../../../assets/images/variant01.png";
import variant02 from "../../../assets/images/variant02.png";
import variant03 from "../../../assets/images/variant03.png";
import variant04 from "../../../assets/images/variant04.png";
import variant05 from "../../../assets/images/variant05.png";
import variant06 from "../../../assets/images/variant06.png";
import variant07 from "../../../assets/images/variant07.png";
import variant08 from "../../../assets/images/variant08.png";

interface ContainerProps {}

const NavigationMobileContent: React.FC<ContainerProps> = ({}) => {
  return (
    <div className="d-lg-none fixed-bottom">
      <div className={styles.container}>
        <Link to="/account/for-delivery">
          <img src={variant01} alt="" className="img-fluid" />
        </Link>
        <Link to="/account/my-restaurant-menu">
          <img src={variant03} alt="" className="img-fluid" />
        </Link>
        <Link to="/account/order-history">
          <img src={variant05} alt="" className="img-fluid" />
        </Link>
        <Link to="/account">
          <img src={variant07} alt="" className="img-fluid" />
        </Link>
      </div>
    </div>
  );
};

export default NavigationMobileContent;
