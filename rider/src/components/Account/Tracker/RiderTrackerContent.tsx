import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import styles from "./RiderTrackerContent.module.scss";

import OrderCancel from "../../../assets/images/order-cancel.png";
import OrderDelivered from "../../../assets/images/order-delivered.png";

interface ContainerProps {}

const RiderTrackerContent: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Row>
          <Col>
            <h3>Order ID: XRF123</h3>
          </Col>
        </Row>
        <Row xs={1} md={2}>
          <Col>
            <p>
              Restaurant Name <span>Měiwèi de shíwù 美味的食物</span>
            </p>
          </Col>
          <Col>
            <p>
              Restaurant Contact <span>(+63) 917 456 7890</span>
            </p>
          </Col>
        </Row>
      </div>
      <div className={styles.customerDetails}>
        <Row>
          <Col>
            <p>
              Customer Name: <span>Brandon Boyd</span>
            </p>
          </Col>
          <Col>
            <p>
              Customer Contact: <span>(+63) 919 876 5432</span>
            </p>
          </Col>
          <hr />
        </Row>
        <Row>
          <Col>
            <p>
              Pick up Address:{" "}
              <span>456 Ayala Bldg, DreamWeaver St., Panglao, Bohol</span>
            </p>
          </Col>
          <Col>
            <p>
              Delivery Address:{" "}
              <span>123 Ionic Bldg, DirectX 3d, Panglao, Bohol</span>
            </p>
          </Col>
          <hr />
        </Row>
        <Row>
          <Row>
            <Col>
              <p>
                Delivery Fee: <span>80 php</span>
              </p>
              <p>
                Type of Payment: <span>COD (Cash)</span>
              </p>
            </Col>

            <Col>
              <Row className={styles.canceledDelivered} xs={2} md={5}>
                <Col className={styles.orderBtn}>
                  <img src={OrderCancel} />
                  <Button>Canceled</Button>
                </Col>
                <Col className={styles.orderBtn}>
                  <img src={OrderDelivered} />
                  <Button>Delivered</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
      </div>
      <Row>
        <Col>
          <p>
            Order Placed Date: <span>10/14/2022</span>
          </p>
        </Col>
        <Col>
          <p>
            Order Placed Time: <span>12:00 PM</span>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default RiderTrackerContent;
