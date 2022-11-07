import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import styles from "./OtpContainer.module.scss";
import OtpForm from "./OtpForm";

interface ContainerProps {}

const OtpContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="md">
      <Row className={styles.container}>
        <Col className="d-flex d-lg-block flex-column justify-content-center">
          <OtpForm />
        </Col>
      </Row>
    </Container>
  );
};

export default OtpContainer;
