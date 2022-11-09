import React from "react";

import styles from "./OrdersContainer.module.scss";
import OrdersContent from "./OrdersContent";

interface ContainerProps {}

const OrdersContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <OrdersContent />
    </div>
  );
};

export default OrdersContainer;
