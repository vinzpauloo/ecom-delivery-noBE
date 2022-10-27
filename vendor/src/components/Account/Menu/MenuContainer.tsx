import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./MenuContainer.module.scss";
import Navigation from "../Navigation";
import MenuContent from "./MenuContent";

interface ContainerProps {}

const MenuContainer: React.FC<ContainerProps> = ({}) => {
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
            <MenuContent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MenuContainer;
