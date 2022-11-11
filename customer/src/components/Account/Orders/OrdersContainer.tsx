import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./OrdersContainer.module.scss";
import OrdersContent from "./OrdersContent";

interface ContainerProps {}

const OrdersContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl">
      <Row className={styles.container}>
        <Col lg={12} xs={12}>
          <OrdersContent />
        </Col>
      </Row>
    </Container>
  );
};

export default OrdersContainer;
