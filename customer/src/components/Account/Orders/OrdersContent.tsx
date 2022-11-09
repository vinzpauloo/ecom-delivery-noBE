import React from "react";

import styles from "./OrdersContent.module.scss";

interface ContainerProps {}

const OrdersContent: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <h2>OrdersContent</h2>
    </div>
  );
};

export default OrdersContent;
