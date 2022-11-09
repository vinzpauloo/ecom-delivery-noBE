import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import OrderSummary from "./OrderSummary";
import styles from "./CheckoutContainer.module.scss";
import DeliveryDetails from "./DeliveryDetails";
import BillDetails from "./BillDetails";

interface ContainerProps {}

const CheckoutContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="md" className={styles.container}>
      <Row className="mb-4">
        <Col>
          <DeliveryDetails />
        </Col>
      </Row>

      <Row className={styles.equalHeightColumns}>
        <Col lg={7} className="mb-4">
          <OrderSummary />
        </Col>
        <Col lg={5}>
          <BillDetails />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutContainer;
