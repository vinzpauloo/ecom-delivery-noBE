import React, { useState } from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import styles from "./RiderTrackerContent.module.scss";

import OrderCancel from "../../../assets/images/order-cancel.png";
import OrderDelivered from "../../../assets/images/order-delivered.png";
import WazeIcon from "../../../assets/images/waze.png";

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
                  <Link to={"/account/order-history"}>
                    <Button>Canceled</Button>
                  </Link>
                </Col>
                <Col className={styles.orderBtn}>
                  <img src={OrderDelivered} />
                  <Link to={`/account/order-history`}>
                    <Button>Delivered</Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
      </div>
      <Container className={styles.orderDetails}>
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
        <Row>
          <ul title="Items:">
            <Row>
              <Col>
                <li>3x Ramen noodles</li>
                <li>
                  {" "}
                  2x Milk tea <span>(1 watermelon)</span>
                  <span>(1 Soya bean)</span>
                </li>
                <li> 1x Peking Duck</li>
              </Col>
              <Col>
                <li>145php x3 - 435php</li>
                <li> 120php x2 - 240php</li>
                <li> 500php 1x - 500php</li>
              </Col>
            </Row>
          </ul>
        </Row>
      </Container>
      <Row>
        <Col md={{ span: 0, offset: 5 }} xs={{ span: 0, offset: 4 }}>
          <a
            href="https://waze.com/ul?q=Glorietta%202%20Basement%20Parking&ll=14.55147636%2C121.02443576&navigate=yes"
            target="_blank"
            rel="noreferrer"
          >
            <img src={WazeIcon} alt="" className={styles.wazeImg} />
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default RiderTrackerContent;
