import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import styles from "./RiderTrackerContainer.module.scss";
import RiderTrackerContent from "./RiderTrackerContent";

interface ContainerProps {}

const RiderTrackerContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="md">
      <Row className={styles.container}>
        {/* <Col className="d-flex d-md-block flex-column justify-content-center"> */}
        <Col>
          <RiderTrackerContent />
        </Col>
      </Row>
    </Container>
  );
};

export default RiderTrackerContainer;
