import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import styles from "./OrderContainer.module.scss";

interface ContainerProps {}

const OrderContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="md">
      <Row className={styles.container}>
        <Col className="d-flex d-lg-block flex-column justify-content-center">
          Order Container
        </Col>
      </Row>
    </Container>
  );
};

export default OrderContainer;
