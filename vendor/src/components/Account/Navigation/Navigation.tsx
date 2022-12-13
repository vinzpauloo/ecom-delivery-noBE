import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import styles from "./Navigation.module.scss";

interface ContainerProps {}

const Navigation: React.FC<ContainerProps> = ({}) => {
  return (
    <Container className={`d-none d-md-block ${styles.navigation}`}>
      <ul>
        <li>
          {/* <Link to="/account/reset-password">Reset Password</Link> */}
          <Link to="/account/for-delivery">For Delivery</Link>
        </li>
        <li>
          <Link to="/account/my-restaurant-menu">Menu</Link>
        </li>
        <li>
          <Link to="/account/flavors">Flavors</Link>
        </li>
        <li>
          <Link to="/account/order-history">Order History</Link>
        </li>
        <li>
          <Link to="/account">My Account</Link>
        </li>
      </ul>
    </Container>
  );
};

export default Navigation;
