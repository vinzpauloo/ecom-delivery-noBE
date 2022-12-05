import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./ChangePasswordContainer.module.scss";
import ChangePasswordForm from "./ChangePasswordForm";

interface ContainerProps {}

const ChangePasswordContainer: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.background}>
      <Container fluid="md">
        <Row className={styles.container}>
          <Col lg={{ span: 10, offset: 1 }} xs={12}>
            <ChangePasswordForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChangePasswordContainer;
