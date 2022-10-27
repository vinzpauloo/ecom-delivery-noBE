import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./SigninContainer.module.scss";
import NewAccount from "./NewAccount";
import SigninForm from "./SigninForm";
import SigninImage from "./SigninImage";

interface ContainerProps {}

const SigninContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <>
      <Container fluid="md">
        <Row
          lg={2}
          xs={1}
          className={`justify-content-center align-items-center flex-lg-row flex-column-reverse ${styles.container}`}
        >
          <Col>
            <div className="d-flex justify-content-center">
              <SigninImage />
            </div>
          </Col>
          <Col>
            <SigninForm />
            <NewAccount />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SigninContainer;
