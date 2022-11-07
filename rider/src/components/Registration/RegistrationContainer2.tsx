import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./RegistrationContainer2.module.scss";
import RegistrationForm from "./RegistrationForm2";

interface ContainerProps {}

const RegistrationContainer2: React.FC<ContainerProps> = ({}) => {
  return (
    <>
      <Container fluid="md">
        <Row className={`${styles.container}`}>
          <Col lg={{ span: 10, offset: 1 }} xs={12}>
            <RegistrationForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationContainer2;
