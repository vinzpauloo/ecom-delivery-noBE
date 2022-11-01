import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./LoginContainer.module.scss";
import NewAccount from "./NewAccount";
import LoginForm from "./LoginForm";
import LoginImage from "./LoginImage";

interface ContainerProps {}

const LoginContainer: React.FC<ContainerProps> = () => {
  return (
    <>
      <Container fluid="md">
        <Row
          lg={2}
          xs={1}
          className={`justify-content-center align-items-center flex-lg-row flex-column-reverse ${styles.container}`}
        >
          <Col xs={{ order: 2 }} lg={{ order: 1 }}>
            <div className="d-flex justify-content-center">
              <LoginImage />
            </div>
          </Col>
          <Col xs={{ order: 1 }} lg={{ order: 2 }}>
            <LoginForm />
            <NewAccount />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginContainer;
