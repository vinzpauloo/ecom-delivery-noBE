import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./RewardsContainer.module.scss";
import Navigation from "../Navigation";

import RewardsContent from "./RewardsContent";

interface ContainerProps {}

const RewardsContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl">
      <Row className={styles.container}>
        <Col lg={4} className="d-none d-lg-block">
          <div className={styles.navigationContainer}>
            <Navigation />
          </div>
        </Col>
        <Col lg={8} className={styles.bg}>
          <div className={styles.contentContainer}>
            <RewardsContent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RewardsContainer;
