import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import styles from "./OrderContent.module.scss";

interface ContainerProps {}

const OrderContent: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <h1>Order Content</h1>
    </div>
  );
};

export default OrderContent;
