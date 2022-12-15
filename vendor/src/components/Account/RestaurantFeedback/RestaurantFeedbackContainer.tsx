import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavigationContainer from "../Navigation/NavigationContainer";

import styles from "./RestaurantFeedbackContainer.module.scss";
import RestaurantFeedbackContent from "./RestaurantFeedbackContent";

interface ContainerProps {}

const RestaurantFeedbackContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl">
      <Row className={styles.container}>
        <Col className={`${styles.mobileNav} d-lg-none`}>
          <div className={styles.navigationContainer}>
            <NavigationContainer />
          </div>
        </Col>
        <Col>
          <div className={styles.contentContainer}>
            <RestaurantFeedbackContent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantFeedbackContainer;
