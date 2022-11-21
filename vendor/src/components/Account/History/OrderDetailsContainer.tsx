import React from "react";
import { Container } from "react-bootstrap";

import styles from "./OrderDetailsContainer.module.scss";
import OrderDetailsContent from "./OrderDetailsContent";

interface ContainerProps {}

const OrderDetailsContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.background}>
      <Container fluid="xl" className="">
        <section className={styles.container}>
          <OrderDetailsContent />
        </section>
      </Container>
    </div>
  );
};

export default OrderDetailsContainer;
