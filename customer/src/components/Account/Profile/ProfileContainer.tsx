import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./ProfileContainer.module.scss";
import ProfileForm from "./ProfileForm";

interface ContainerProps {}

const ProfileContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.background}>
      <Container fluid="md">
        <Row className={styles.container}>
          <Col lg={{ span: 10, offset: 1 }} xs={12}>
            <ProfileForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileContainer;
