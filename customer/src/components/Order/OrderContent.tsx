import React from "react";
import { Col, Row } from "react-bootstrap";

import statusIsReceived from "../../assets/images/order-received.png";
import statusIsPreparing from "../../assets/images/kitchen-prep.png";
import statusIsOtw from "../../assets/images/rider-on-the-way.png";
import statusIsDelivered from "../../assets/images/delivered.png";

import styles from "./OrderContent.module.scss";

interface ContainerProps {}

const OrderContent: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <div className="text-center">
        <div className={styles.title}>
          <h3>Order Tracker</h3>
          <p>Please don't close the page.</p>
        </div>

        <Row md={4} xs={1}>
          <Col>
            <div className={styles.status}>
              <img src={statusIsReceived} alt="" />
              <p>Order Received</p>
            </div>
          </Col>
          <Col>
            <div className={styles.status}>
              <img src={statusIsPreparing} alt="" />
              <p>Kitchen Preparing ...</p>
            </div>
          </Col>
          <Col>
            <div className={styles.status}>
              <img src={statusIsOtw} alt="" />
              <p>Rider on its way</p>
            </div>
          </Col>
          <Col>
            <div className={styles.status}>
              <img src={statusIsDelivered} alt="" />
              <p>Delivered</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderContent;
