import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

import statusIsReceived from "../../../assets/images/order-received.png";
import statusIsPreparing from "../../../assets/images/kitchen-prep.png";
import statusIsOtw from "../../../assets/images/rider-on-the-way.png";
import statusIsDelivered from "../../../assets/images/delivered.png";

import styles from "./StatusContent.module.scss";

interface ContainerProps {}

const StatusContent: React.FC<ContainerProps> = ({}) => {
  //   const { id } = useParams();

  //   useEffect(() => {
  //     loadOrderForDelivery("preparing");
  //   }, []);
  return (
    <div className={styles.container}>
      <div className="text-center">
        <div className={styles.title}>
          <h3>Order Tracker</h3>
        </div>

        <Row md={4} xs={1}>
          <Col>
            <div className={styles.status}>
              <img src={statusIsReceived} alt="" />
              <p>Order Received</p>
            </div>
            <Button disabled>Activated</Button>
          </Col>
          <Col>
            <div className={styles.status}>
              <img src={statusIsPreparing} alt="" />
              <p>Kitchen Preparing ...</p>
            </div>
            <Button>Activate</Button>
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

export default StatusContent;
