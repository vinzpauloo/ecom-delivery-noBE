import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./Navigation.module.scss";

interface ContainerProps {}

const Navigation: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={`d-none d-lg-block ${styles.navigation}`}>
      <ul>
        <li>
          <Link to="/account">My Restaurant</Link>
        </li>
        <li>
          <Link to="/account/my-restaurant-menu">Menu</Link>
        </li>
        <li>
          <Link to="/account/order-history">Order History</Link>
        </li>
        <li>
          <Link to="/account/reset-password">Reset Password</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
