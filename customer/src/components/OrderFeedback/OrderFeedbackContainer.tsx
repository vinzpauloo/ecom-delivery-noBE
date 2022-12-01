import React from "react";
import { Container } from "react-bootstrap";

import styles from "./OrderFeedbackContainer.module.scss";
import OrderFeedbackContent from "./OrderFeedbackContent";

interface ContainerProps {}

const OrderFeedbackContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl" className={styles.container}>
      <OrderFeedbackContent />
    </Container>
  );
};

export default OrderFeedbackContainer;
