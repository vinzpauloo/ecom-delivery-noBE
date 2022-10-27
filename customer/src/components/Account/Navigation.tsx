import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./Navigation.module.scss";

interface ContainerProps {}

const Navigation: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.navigation}>
      <ul>
        <li>
          <Link to="/account">My Profile</Link>
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
