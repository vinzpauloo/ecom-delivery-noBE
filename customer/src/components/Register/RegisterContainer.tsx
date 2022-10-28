import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./RegisterContainer.module.scss";
import RegisterForm from "./RegisterForm";

interface ContainerProps {}

const RegisterContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="md">
      <Row className={styles.container}>
        <Col lg={{ span: 10, offset: 1 }} xs={12}>
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterContainer;
