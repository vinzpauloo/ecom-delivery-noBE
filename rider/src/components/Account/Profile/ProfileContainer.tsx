import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./ProfileContainer.module.scss";
import Navigation from "../Navigation";
import ProfileContent from "./ProfileContent";

interface ContainerProps {}

const ProfileContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <Container fluid="xxl">
      <Row className={styles.container}>
        <Col lg={4} className="d-none d-lg-block">
          <div className={styles.navigationContainer}>
            <Navigation />
          </div>
        </Col>
        <Col lg={8} className="">
          <div className={styles.contentContainer}>
            <ProfileContent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileContainer;
