import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

import styles from "./OrderInformation.module.scss";

interface ContainerProps {}

const OrderInformation: React.FC<ContainerProps> = ({}) => {
  return (
    <div className={styles.tableContainer}>
      <div className="">
        <Form>
          <Container className={styles.orderDeliveryContainerDesktop} fluid>
            <Row className="mx-md-3">
              <Col md={2} className="d-flex flex-column gap-1">
                <div className={styles.orderId}>
                  <p>ORDER ID:</p>
                </div>
              </Col>
              <Col md={4}>
                <div className={styles.customerInfo}>
                  <Row>
                    <Col md={8}>
                      <div className="d-flex gap-5">
                        <li>
                          Customer Name: <span> </span>
                        </li>
                        <li>
                          Contact Number: <span></span>
                        </li>
                      </div>
                      <li>
                        Pick up Address :<span> </span>
                      </li>
                      <li>
                        Delivery Address:
                        <span> </span>
                      </li>
                      <li>
                        Order Placed Time: <span></span>
                      </li>
                    </Col>
                    <Col>
                      <li className="d-flex flex-column justify-content-center align-items-center">
                        Order Status: <span> </span>
                        {/* <img src={OrderReceivedIcon} /> */}
                      </li>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <div className={`${styles.orderItems} overflow-hidden`}>
                        <ul aria-label="Order Items">
                          <li>Ramen Noodles(3x)</li>
                          <li>Milk Tea(2x)</li>
                          <li>1 Water Melon</li>
                          <li>1 Boba Soya</li>
                          <li>Pecking Duck (1x)</li>
                        </ul>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className={styles.deliveryFee}>
                        <p>
                          Delivery Fee <br />
                          <span> ₱100.00</span>
                        </p>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className={styles.grandTotal}>
                        <p>
                          Grand Total <br />
                          <span> ₱100.00</span>
                        </p>
                      </div>
                    </Col>
                    <Col md={3}>Assign Rider</Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    </div>
  );
};

export default OrderInformation;
