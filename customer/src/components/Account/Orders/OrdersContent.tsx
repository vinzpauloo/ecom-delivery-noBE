import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./OrdersContent.module.scss";

interface ContainerProps {}

const OrderItem = () => {
  return (
    <div className={styles.item}>
      <Row>
        <Col lg={3}>
          {/* Order ID */}
          <div className={styles.orderId}>
            <h6 className="text-center text-uppercase">Order ID: XRF1234</h6>
          </div>
        </Col>
        <Col lg={9}>
          <div className={styles.orderDetails}>
            <Row>
              {/* Customer information */}
              <Col lg={8}>
                <Row lg={2} xs={1} className="mb-2">
                  <Col>
                    <Row>
                      <Col>
                        <p>Customer Name:</p>
                      </Col>
                      <Col>
                        <p className={styles.value}>Brandon Boyd</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        <p>Contact Number:</p>
                      </Col>
                      <Col>
                        <p className={styles.value}>0917 123 4567</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col lg={3} xs={5}>
                    <p>Pick up Address:</p>
                  </Col>
                  <Col lg={9} xs={7}>
                    <p className={styles.value}>
                      Chan’s Chinese Restaurant, Panglao, Bohol, Philippines
                    </p>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col lg={3} xs={5}>
                    <p>Delivery Address:</p>
                  </Col>
                  <Col lg={9} xs={7}>
                    <p className={styles.value}>
                      4117 41st Floor., GT Tower Intl., De La Costa, Makati City
                    </p>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col lg={3} xs={5}>
                    <p>Order Time:</p>
                  </Col>
                  <Col lg={9} xs={7}>
                    <p className={styles.value}>01:30pm</p>
                  </Col>
                </Row>
              </Col>

              {/* Order status */}
              <Col lg={4}>
                <div className="text-center">
                  <p className="mb-1">Order Status:</p>
                  <p className={styles.value}>Delivered</p>
                </div>
              </Col>
            </Row>

            {/* Order summary */}
            <Row lg={3} xs={1}>
              <Col>
                <div className={styles.boxGray}>
                  <Row>
                    <Col lg={5}>
                      <p className={styles.label}>Order Items</p>
                    </Col>
                    <Col lg={7}>
                      {/* Order list */}
                      <ul className={styles.orders}>
                        <li>Ramen Noodles (3x)</li>
                        <li>Milk Tea - Watermelon (1x)</li>
                        <li>Milk Tea - Boba Soya (1x)</li>
                        <li>Pecking Duck (1x)</li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col>
                <div className={`text-center ${styles.boxGray}`}>
                  <p className={styles.label}>Delivery Fee</p>
                  <p className={styles.price}>85 php</p>
                </div>
              </Col>
              <Col>
                <div className={`text-center ${styles.boxGray}`}>
                  <p className={styles.label}>Grand Total</p>
                  <p className={styles.price}>1,350 php</p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const OrdersContent: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.container}>
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="mb-0">Order History</h1>
        <Link to="/account">Go Back</Link>
      </div>

      <div className={styles.innerContainer}>
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </div>
    </div>
  );
};

export default OrdersContent;
