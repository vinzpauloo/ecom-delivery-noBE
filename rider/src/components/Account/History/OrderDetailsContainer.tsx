import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./OrderDetailsContainer.module.scss";
import Navigation from "../Navigation";
import OrderDetailsContent from "./OrderDetailsContent";

interface ContainerProps {}

const OrderDetailsContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl">
      <Row className={styles.container}>
        <Col lg={4} className={`${styles.mobileNav} d-none d-lg-block`}>
          <div className={styles.navigationContainer}>
            <Navigation />
          </div>
        </Col>
        <Col lg={{ span: 6, offset: 2 }}>
          <div className={styles.contentContainer}>
            <OrderDetailsContent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetailsContainer;
