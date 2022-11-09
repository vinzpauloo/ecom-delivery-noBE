import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

import styles from "./DeliveryDetails.module.scss";

interface ContainerProps {}

const DeliveryDetails: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <h4>Delivery Details</h4>

      <Form className={styles.form}>
        <Row lg={2} xs={1}>
          <Col>
            <Form.Group className="position-relative">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="position-relative">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
        </Row>

        <Row lg={2} xs={1}>
          <Col>
            <Form.Group className="position-relative">
              <Form.Label>Mobile number</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="position-relative">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>
          </Col>
        </Row>

        <Row lg={2} xs={1}>
          <Col>
            <Form.Group className="position-relative">
              <Form.Label>Enter Address</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col>
            <div
              className={`d-flex justify-content-center gap-4 ${styles.checkbox}`}
            >
              <Form.Check
                type="checkbox"
                id="address_this"
                label="Use this Address"
              />
              <Form.Check
                type="checkbox"
                id="address_new"
                label="Use Different Address"
              />
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DeliveryDetails;
