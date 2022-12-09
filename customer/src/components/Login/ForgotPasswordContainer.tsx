import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./ForgotPasswordContainer.module.scss";

import ForgotPassword from "./ForgotPassword";

import tarsierLogo from "../../assets/images/tarsier-logo.png";
import tarsierLogo2 from "../../assets/images/tarsier-logo2.png";

interface ContainerProps {}

const ForgotPasswordContainer: React.FC<ContainerProps> = () => {
  return (
    <>
      <Container fluid="md">
        <Row
          lg={2}
          xs={1}
          className={`justify-content-center align-items-center flex-lg-row`}
        >
          {/* <Col
            className={`d-flex justify-content-center align-items-center mt-5`}
          >
            <img src={tarsierLogo} />
          </Col> */}
          <Col className={`mt-5 p-5`}>
            <div className={`d-flex justify-content-center align-items-center`}>
              <img src={tarsierLogo2} />
            </div>
            <ForgotPassword />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgotPasswordContainer;
