import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useOrder } from "../../../hooks/useOrder";

import placeholder from "../../../assets/images/placeholder.png";
import statusIsReceived from "../../../assets/images/order-received.png";
import statusIsPreparing from "../../../assets/images/kitchen-prep.png";
import statusIsOtw from "../../../assets/images/rider-on-the-way.png";
import statusIsDelivered from "../../../assets/images/order-delivered.png";
import statusIsDeliveredAlt from "../../../assets/images/order-delivered-alt.png";

import styles from "./OrderDetailsContent.module.scss";
import { isTemplateExpression } from "typescript";

import { getDate, getTime } from "../../../utils/formatDate";

interface ContainerProps {}

type TOrder = {
  id: number;
  created_at: string;
  customer_id: number;
  customer_name: string;
  customer_mobile: string;
  order_address: string;
  order_status: string;
  order_mobile: number;
  restaurant_address: string;
  restaurant_name: string;
  restaurant_photo: string;
  products: [{ name: string; quantity: number }];
  total_amount: number;
  delivered_at: string;
  received_at: string;
};

// const sampleOrder: TOrder = {
//   id: 2,
//   created_at: "01:30 PM",
//   customer_id: 12,
//   customer_name: "Jaime Flores",
//   customer_mobile: "+639294606693",
//   order_address: "13 R Road 8 Brgy. 1st West Crame San Juan City",
//   order_status: "Pending",
//   restaurant_address:
//     "4117 41st Floor, GT Tower Intl., De La Costa, Makati City",
// };

const OrderDetailsContent: React.FC<ContainerProps> = ({}) => {
  //   const order = sampleOrder;

  const [order, setOrder] = useState<TOrder>();
  const { getOrdersById } = useOrder();

  // Get the params from the url
  const { id } = useParams();

  const loadOrder = async () => {
    const response = await getOrdersById(id);
    console.log("getOrdersById response", response);
    setOrder(response);
  };

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Row>
          {/* Main content */}
          <Col lg={{ span: 7 }}>
            <h1 className="mb-0 text-center">Order Details</h1>
            <div className={styles.orderId}>
              <h6 className="text-center text-uppercase">
                Order ID: {order?.id}
              </h6>
            </div>

            <Row>
              <Col>
                {/* Basic Customer & Order Info */}
                <div className={styles.orderDetails}>
                  <Row>
                    <Col>
                      {/* Customer name & contact number */}
                      <Row sm={2} xs={1} className="mb-0 mb-sm-3">
                        <Col>
                          <Row className="mb-2 mb-sm-0">
                            <Col xs={5} sm={6}>
                              <p>Customer Name :</p>
                            </Col>
                            <Col xs={7} sm={6}>
                              <p className={styles.value}>
                                {order?.customer_name}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Row className="mb-2 mb-sm-0">
                            <Col xs={5} sm={6}>
                              <p>Contact Number :</p>
                            </Col>
                            <Col xs={7} sm={6}>
                              <p className={styles.value}>
                                {order?.order_mobile}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      {/* Pick up address */}
                      <Row className="mb-2 mb-sm-3">
                        <Col sm={3} xs={5}>
                          <p>Pick up Address :</p>
                        </Col>
                        <Col sm={9} xs={7}>
                          <p className={styles.value}>
                            {order?.restaurant_address}
                          </p>
                        </Col>
                      </Row>

                      {/* Delivery address */}
                      <Row className="mb-2 mb-sm-3">
                        <Col sm={3} xs={5}>
                          <p>Delivery Address :</p>
                        </Col>
                        <Col sm={9} xs={7}>
                          <p className={styles.value}>{order?.order_address}</p>
                        </Col>
                      </Row>

                      {/* Order placed & delivered time */}
                      <Row sm={2} xs={1} className="mb-0 mb-sm-3">
                        <Col>
                          <Row className="mb-2 mb-sm-0">
                            <Col xs={5} sm={6}>
                              <p>Order Placed Time :</p>
                            </Col>
                            <Col xs={7} sm={6}>
                              <p className={styles.value}>
                                {order && getTime(order?.created_at)}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Row className="mb-2 mb-sm-0">
                            <Col xs={5} sm={6}>
                              <p>Order Delivered Time :</p>
                            </Col>
                            <Col xs={7} sm={6}>
                              <p className={styles.value}>
                                {/* {order && getTime(order?.created_at)} */}
                                {order?.delivered_at}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      {/* Date ordered & View details */}
                      <Row sm={2} xs={1}>
                        <Col>
                          <Row>
                            <Col xs={5} sm={6}>
                              <p>Date Ordered :</p>
                            </Col>
                            <Col xs={7} sm={6}>
                              <p className={styles.value}>
                                {/* {order && getTime(order?.created_at)} */}
                                {order?.received_at}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>

                {/* Order Details + Restaurant Logo */}
                <div className={styles.orderDetails}>
                  <Row>
                    <Col sm={8}>
                      {/* Order Details */}
                      <Row>
                        <Col xs={5} sm={4}>
                          <p>Order Details :</p>
                        </Col>
                        <Col xs={7} sm={8}>
                          <ul className={styles.orderList}>
                            {order?.products?.map((item, index) => {
                              return (
                                <li
                                  key={index}
                                >{`(${item.quantity}x) ${item.name}`}</li>
                              );
                            })}
                          </ul>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={4}>
                      {/* Restaurant Logo */}
                      <div className={styles.restaurantLogo}>
                        <p className={`mb-3 ${styles.value}`}>
                          {order?.restaurant_name}
                        </p>
                        <img
                          className="img-fluid"
                          src={order?.restaurant_photo}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Order Summary + Order Status */}
                <div className={styles.orderDetails}>
                  <Row>
                    <Col sm={8}>
                      {/* Order Summary */}
                      <Row className="mb-2 mb-sm-3">
                        <Col xs={5} sm={4}>
                          <p>Sub Total :</p>
                        </Col>
                        <Col xs={7} sm={8}>
                          <p className={styles.value}>
                            ₱{order?.total_amount}.00
                          </p>
                        </Col>
                      </Row>
                      <Row className="mb-2 mb-sm-3">
                        <Col xs={5} sm={4}>
                          <p>Delivery Fee :</p>
                        </Col>
                        <Col xs={7} sm={8}>
                          <p className={styles.value}></p>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={5} sm={4}>
                          <p>Total :</p>
                        </Col>
                        <Col xs={7} sm={8}>
                          <p className={styles.value}>
                            ₱{order?.total_amount}.00
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={4}>
                      {/* Restaurant Logo */}
                      <div className={styles.orderStatus}>
                        <p>Order Status</p>
                        <div className={styles.status2}>
                          <div className={styles.imgContainer2}>
                            <img src={statusIsDelivered} alt="" />
                            {order?.order_status === "delivered" && (
                              <img
                                className={`${styles.altImg2}`}
                                src={statusIsDeliveredAlt}
                                alt=""
                              />
                            )}
                          </div>
                        </div>
                        {/* <img
                          className="img-fluid mt-1 mb-2"
                          src={statusIsReceived}
                        />
                        <p className={styles.value}>{order?.order_status}</p> */}
                      </div>
                    </Col>
                  </Row>

                  <div className={styles.btnBack}>
                    <Link to="/account/order-history">Back</Link>
                  </div>

                  <div className={styles.feedbackBtn}>
                    <Link to={`/account/feedback/${id}`}>Rider Feedback</Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderDetailsContent;
