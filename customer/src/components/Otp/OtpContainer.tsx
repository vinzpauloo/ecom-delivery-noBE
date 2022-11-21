import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import styles from "./OtpContainer.module.scss";
import OtpForm from "./OtpForm";

interface ContainerProps {}

const OtpContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.background}>
      <Container fluid="md">
        <Row className={styles.container}>
          <OtpForm />
        </Row>
      </Container>
    </div>
  );
};

export default OtpContainer;
