import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./FlavorContainer.module.scss";
import NavigationContainer from "../Navigation/NavigationContainer";
import FlavorContent from "./FlavorContent";

interface ContainerProps {}

const FlavorContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl">
      <Row className={styles.container}>
        <Col lg={4} className={styles.mobileNav}>
          <div className={styles.navigationContainer}>
            <NavigationContainer />
          </div>
        </Col>
        <Col lg={8}>
          <div className={styles.contentContainer}>
            <FlavorContent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FlavorContainer;
