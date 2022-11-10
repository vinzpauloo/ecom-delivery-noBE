import React from "react";
import { Form } from "react-bootstrap";

import styles from "./OrdersContent.module.scss";

interface ContainerProps {}

const OrdersContent: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <h2>Order History</h2>
    </div>
  );
};

export default OrdersContent;
