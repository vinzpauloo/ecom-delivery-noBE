import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./OrderContainer.module.scss";
import NavigationContainer from "../Navigation/NavigationContainer";
import OrderContent from "./OrderContent";

interface ContainerProps {}

const OrderContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl">
      <Row className={styles.container}>
        <Col lg={4} className="d-lg-block">
          <div className={styles.navigationContainer}>
            <NavigationContainer />
          </div>
        </Col>
        <Col lg={8} className={styles.bg}>
          <div className={styles.contentContainer}>
            <OrderContent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderContainer;
