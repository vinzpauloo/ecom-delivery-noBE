import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import styles from "./OrderContainer.module.scss";
import OrderContent from "./OrderContent";

interface ContainerProps {}

const OrderContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="md">
      <Row className={styles.container}>
        <Col className="d-flex d-md-block flex-column justify-content-center">
          <OrderContent />
        </Col>
      </Row>
    </Container>
  );
};

export default OrderContainer;
