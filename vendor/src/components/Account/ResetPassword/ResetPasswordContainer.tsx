import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./ResetPasswordContainer.module.scss";
import NavigationContainer from "../Navigation/NavigationContainer";
import ResetPasswordContent from "./ResetPasswordContent";

interface ContainerProps {}

const ResetPasswordContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl">
      <Row className={styles.container}>
        <Col lg={4} className="d-none d-lg-block">
          <div className={styles.navigationContainer}>
            <NavigationContainer />
          </div>
        </Col>
        <Col lg={8}>
          <div className={styles.contentContainer}>
            <ResetPasswordContent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordContainer;
