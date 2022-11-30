import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./LoginContainer.module.scss";
import NewAccount from "./NewAccount";
import LoginForm from "./LoginForm";
import LoginImage from "./LoginImage";

interface ContainerProps {}

const LoginContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <>
      <Container fluid="md">
        <Row
          lg={2}
          xs={1}
          className={`justify-content-center align-items-center flex-lg-row flex-column ${styles.container}`}
        >
          <Col>
            <div className="d-flex justify-content-center">
              <LoginImage />
            </div>
          </Col>
          <Col className={styles.loginFormLeftContent}>
            <LoginForm />
            <NewAccount />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginContainer;
