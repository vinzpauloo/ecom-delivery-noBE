import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useOrders } from "../../../hooks/useOrders";
import { getDate, getTime } from "../../../utils/formatDate";

import placeholder from "../../../assets/images/placeholder.png";
import statusIsReceived from "../../../assets/images/order-received.png";
import statusIsPreparing from "../../../assets/images/order-preparing.png";
import statusIsOtw from "../../../assets/images/order-otw.png";
import statusIsDelivered from "../../../assets/images/order-delivered.png";
import statusIsCancel from "../../../assets/images/order-cancel.png";

import styles from "./OrderDetailsContent.module.scss";

interface ContainerProps {}

const statusImages = {
  received: statusIsReceived,
  preparing: statusIsPreparing,
  otw: statusIsOtw,
  delivered: statusIsDelivered,
  canceled: statusIsCancel,
};

type TOrder = {
  id: number;
  created_at: string;
  customer_id: number;
  customer_name: string;
  customer_mobile: string;
  delivered_at: string;
  order_address: string;
  order_status: string;
  products: [{ name: string; quantity: number }];
  restaurant_address: string;
  restaurant_name: string;
  restaurant_photo: string;
  total_amount: number;
};

const StatusImg = ({ status }: { status: string }) => {
  const currentImage = statusImages[status as keyof typeof statusImages];
  return <img className="img-fluid mt-1 mb-2" src={currentImage} />;
};

const OrderDetailsContent: React.FC<ContainerProps> = ({}) => {
  const [order, setOrder] = useState<TOrder>();
  const { getOrdersById } = useOrders();

  // Get the params from the URL
  const { id } = useParams();

  const loadOrder = async () => {
    const response = await getOrdersById(id);
    console.log("getOrdersById response", response);
    setOrder(response);
  };

  const imgPhoto = order?.restaurant_photo
    ? order.restaurant_photo
    : placeholder;

  useEffect(() => {
    loadOrder();
  }, []);

  const getTotal = (subtotal?: number) => {
    const deliveryFee = 86;
    const total = subtotal ? deliveryFee + subtotal : 0;
    return total.toLocaleString();
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Row>
          {/* Main content */}
          <Col lg={{ span: 7 }}>
            <h1 className="mb-0 text-center">Order Details</h1>
            <div className={styles.orderId}>
              <h6 className="text-center text-uppercase">
                Order ID : {order?.id}
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
                                {order?.customer_mobile}
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
                                {order && getTime(order.created_at)}
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
                                {order && order.delivered_at
                                  ? getTime(order.delivered_at)
                                  : "Waiting ..."}
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
                                {order && getDate(order.created_at)}
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
                                >{`${item.name} (${item.quantity}x)`}</li>
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
                        <img className="img-fluid" src={imgPhoto} />
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
                            {order?.total_amount.toLocaleString()} php
                          </p>
                        </Col>
                      </Row>
                      <Row className="mb-2 mb-sm-3">
                        <Col xs={5} sm={4}>
                          <p>Delivery Fee :</p>
                        </Col>
                        <Col xs={7} sm={8}>
                          <p className={styles.value}>85 php</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={5} sm={4}>
                          <p>Total :</p>
                        </Col>
                        <Col xs={7} sm={8}>
                          <p className={styles.value}>
                            {order && getTotal(order.total_amount)} php
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={4}>
                      {/* Restaurant Logo */}
                      <div className={styles.orderStatus}>
                        <p>Order Status</p>
                        {order ? (
                          <>
                            <StatusImg status={order.order_status} />
                            <p className={styles.value}>
                              Order {order.order_status}
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between mx-lg-5 mx-md-4">
                    <div className={styles.btnBlack}>
                      <Link to={`/order/${order?.id}`}>Check order status</Link>
                    </div>

                    <div className={styles.btnBlack}>
                      <Link to="/account/orders">Back</Link>
                    </div>
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
