import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./NewOrderContainer.module.scss";
import NavigationContainer from "../Navigation/NavigationContainer";
import NewOrderContent from "./NewOrderContent";

interface ContainerProps {}

const NewOrderContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl">
      <Row className={`${styles.container} m-0`}>
        <Col lg={4} className={styles.mobileNav}>
          <div className={styles.navigationContainer}>
            <NavigationContainer />
          </div>
        </Col>
        <Col lg={8}>
          <div className={styles.contentContainer}>
            <NewOrderContent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NewOrderContainer;
