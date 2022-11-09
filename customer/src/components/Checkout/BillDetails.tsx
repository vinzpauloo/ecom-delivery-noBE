import React from "react";
import { Col, Row, Form } from "react-bootstrap";

import styles from "./BillDetails.module.scss";

interface ContainerProps {}

const BillDetails: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.promo}>
          <Form.Group className="position-relative">
            <Form.Control
              type="text"
              placeholder="Enter promo code or voucher"
              required
            />
          </Form.Group>
        </div>

        <h4 className="text-center">Bill Details</h4>

        <div className={styles.billDetails}>
          <Row className={styles.orderedAmountRow}>
            <Col>
              <span>Item count</span>
            </Col>
            <Col>
              <strong>003</strong>
            </Col>
          </Row>

          <Row className={styles.orderedAmountRow}>
            <Col>
              <span>Sub-Total</span>
            </Col>
            <Col>
              <strong>1,126 php</strong>
            </Col>
          </Row>

          <Row className={styles.orderedAmountRow}>
            <Col>
              <span>Delivery fee</span>
            </Col>
            <Col>
              <strong>86 php</strong>
            </Col>
          </Row>

          <Row className={styles.total}>
            <Col>
              <strong>Total</strong>
            </Col>
            <Col>
              <strong>1,212 php</strong>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
