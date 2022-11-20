import React from "react";
import { Container } from "react-bootstrap";

import styles from "./OrdersContainer.module.scss";
import OrdersContent from "./OrdersContent";

interface ContainerProps {}

const OrdersContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.background}>
      <Container fluid="xxl" className="">
        <section className={styles.container}>
          <OrdersContent />
        </section>
      </Container>
    </div>
  );
};

export default OrdersContainer;
