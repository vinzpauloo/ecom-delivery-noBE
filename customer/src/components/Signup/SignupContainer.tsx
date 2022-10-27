import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./SignupContainer.module.scss";
import SignupForm from "./SignupForm";

interface ContainerProps {}

const SignupContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <>
      <Container fluid="md">
        <Row className={`${styles.container}`}>
          <Col lg={{ span: 10, offset: 1 }} xs={12}>
            <SignupForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignupContainer;
