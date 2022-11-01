import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import styles from "./OtpContainerOrder.module.scss";
import OtpFormOrder from "./OtpFormOrder";

interface ContainerProps {}

const OtpContainerOrder: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="md">
      <Row className={styles.container}>
        <Col className="d-flex d-lg-block flex-column justify-content-center">
          <OtpFormOrder />
        </Col>
      </Row>
    </Container>
  );
};

export default OtpContainerOrder;
