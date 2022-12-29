import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./ResetPasswordContainer.module.scss";
import Navigation from "../Navigation";
import ProfileContent from "./ResetPasswordContent";

interface ContainerProps {}

const ResetPasswordContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl">
      <Row className={styles.container}>
        <Col lg={4}>
          <div className={styles.navigationContainer}>
            <Navigation />
          </div>
        </Col>
        <Col lg={8}>
          <div className={styles.contentContainer}>
            <ProfileContent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordContainer;
