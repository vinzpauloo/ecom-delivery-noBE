import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Details from "./Details";
import Filters from "./Filters";

import styles from "./RestaurantContainer.module.scss";

interface ContainerProps {}

const RestaurantContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl" className={`${styles.container}`}>
      <Row className={styles.innerContainer}>
        <Col lg={3} className="d-none d-lg-block">
          <Filters />
        </Col>
        <Col lg={9} className={`p-0 ${styles.bgBrown}`}>
          <Details />
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantContainer;
