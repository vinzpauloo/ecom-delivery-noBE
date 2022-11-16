import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";

import styles from "./BillDetails.module.scss";

type TSummary = {
  deliveryFee: number;
  itemCount: number;
  subtotal: number;
  total: number;
};

interface ContainerProps {}

const BillDetails: React.FC<ContainerProps> = ({}) => {
  const [summary, setSummary] = useState<TSummary>();

  useEffect(() => {
    let checkoutDetails = localStorage.getItem("checkout") || "";
    let checkoutDetailsObj = JSON.parse(checkoutDetails);
    setSummary(checkoutDetailsObj.summaryDetails);
  }, []);

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
              <strong>{summary?.itemCount}</strong>
            </Col>
          </Row>

          <Row className={styles.orderedAmountRow}>
            <Col>
              <span>Sub-Total</span>
            </Col>
            <Col>
              <strong>{summary?.subtotal} php</strong>
            </Col>
          </Row>

          <Row className={styles.orderedAmountRow}>
            <Col>
              <span>Delivery fee</span>
            </Col>
            <Col>
              <strong>{summary?.deliveryFee} php</strong>
            </Col>
          </Row>

          <Row className={styles.total}>
            <Col>
              <strong>Total</strong>
            </Col>
            <Col>
              <strong>{summary?.total} php</strong>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
