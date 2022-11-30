import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./RegistrationContainer.module.scss";
import RegistrationForm from "./RegistrationForm";

interface ContainerProps {}

const RegistrationContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <>
      <Container fluid="md">
        <Row className={styles.registerHeader}>
          <h4>
            Welcome to FOODMONKEY Restaurant Owners
          </h4>
          </Row>
        <Row className={`${styles.container}`}>
          <Col lg={{ span: 10, offset: 1 }} xs={12}>
            <RegistrationForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationContainer;
