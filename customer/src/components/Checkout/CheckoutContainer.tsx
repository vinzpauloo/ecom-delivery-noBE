import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import OrderSummary from "./OrderSummary";
import styles from "./CheckoutContainer.module.scss";
import DeliveryDetails from "./DeliveryDetails";
import BillDetails from "./BillDetails";
import ConfirmOrder from "./ConfirmOrder";
import NewAddress from "./NewAddress";

interface ContainerProps {}

const CheckoutContainer: React.FC<ContainerProps> = ({}) => {
  const [isNewAddress, setIsNewAddress] = useState(false);

  return (
    <Container fluid="md" className={styles.container}>
      {!isNewAddress ? (
        <Row className="mb-4">
          <Col>
            <DeliveryDetails
              isNewAddress={isNewAddress}
              setIsNewAddress={setIsNewAddress}
            />
          </Col>
        </Row>
      ) : (
        <Row className="mb-4">
          <Col>
            <NewAddress
              isNewAddress={isNewAddress}
              setIsNewAddress={setIsNewAddress}
            />
          </Col>
        </Row>
      )}

      <Row className={styles.equalHeightColumns}>
        <Col lg={7} className="mb-4">
          <OrderSummary />
        </Col>
        <Col lg={5}>
          <BillDetails />
        </Col>
      </Row>

      <Row>
        <Col>
          <ConfirmOrder />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutContainer;
