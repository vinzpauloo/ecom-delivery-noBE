import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Dropdown,
  Container,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useGetOrderStatus } from "../../../hooks/useGetOrderStatus";
import { useOrder } from "../../../hooks/useOrder";

import styles from "./OrderContent.module.scss";

interface ContainerProps {}

type ForDeliveryItem = {
  created_at: string;
  customer_id: string;
  customer_mobile: string;
  customer_name: string;
  order_address: string;
  order_email: string;
  order_mobile: string;
  order_status: string;
  otw_at: string;
  payment_type: string;
  plate_number: string;
  restaurant_name: string;
  restaurant_id: string;
  updated_at: string;
  rider_id: string;
  rider_vehicle_model: string;
  id: number;
  restaurant_address: string;
  total_amount: number;
};

const OrderContent: React.FC<ContainerProps> = ({}) => {
  const {
    getCurrentOrder,
    getForDeliveryOTW,
    getOrderCompleted,
    getOrderCanceled,
  } = useGetOrderStatus();

  const { updateOrder, cancelOrder } = useOrder();

  const [forDelivery, setForDelivery] = useState<ForDeliveryItem[]>([]);

  const loadPendingOrder = async (status: string) => {
    const params = { status: status };
    const response = await getCurrentOrder(params);
    console.log("getForDelivery", response);
    setForDelivery(response.data);
    console.log(response.data);
  };

  const navigate = useNavigate();

  const handleCancel = async (id: any) => {
    const response = await cancelOrder(id, "cancel");
    alert("declined order");
    window.location.reload();
    navigate("/account/for-delivery");
  };

  const handleAccept = async (id: any) => {
    console.log(id);
    const response = await updateOrder(id, "received");
    console.log(response);
  };

  useEffect(() => {
    loadPendingOrder("pending");
  }, []);
  return (
    <div className={styles.tableContainer}>
      <div className="">
        <Form>
          <Row>
            <Col>
              <h3>For Delivery (Current Orders)</h3>
            </Col>
          </Row>
          <Row className="d-none d-lg-block">
            <Col>
              <Form.Control
                className={styles.searchBar}
                type="text"
                placeholder="Search food and description"
              />
            </Col>
          </Row>
          {/* Mobile */}
          {forDelivery?.map((item, index) => {
            console.log(item);
            return (
              <Container
                className={`${styles.orderDeliveryContainer} d-flex flex-column gap-3 d-md-none`}
                // className="order-delivery-container d-flex flex-column gap-3 d-md-none"
                fluid
                key={index}
              >
                <Row className="mx-md-3">
                  <Col xs={3} md={2} className="d-flex flex-column gap-1">
                    <div className={styles.orderId}>
                      <p>Order ID: {item.id}</p>
                    </div>
                    <div className={styles.orderItems}>
                      <ul aria-label="Order Items">
                        <li>Ramen Noodles(3x)</li>
                        <li>Milk Tea(2x)</li>
                        <li>1 Water Melon</li>
                        <li>1 Boba Soya</li>
                        <li>Pecking Duck (1x)</li>
                      </ul>
                    </div>
                    <div className={styles.deliveryFee}>
                      <p>
                        Delivery Fee <br />
                        <span>₱{item.rider_id}.00</span>
                      </p>
                    </div>
                    <div className={styles.grandTotal}>
                      <p>
                        Grand Total <br />
                        <span>₱{item.rider_vehicle_model}.00</span>
                      </p>
                    </div>
                  </Col>
                  <Col xs={8} md={4}>
                    <div className={styles.customerInfo}>
                      <li>
                        Customer Name: <span>{item.customer_name}</span>
                      </li>
                      <li>
                        Contact Number: <span>{item.customer_mobile}</span>
                      </li>
                      <li>
                        Pick up Address :<span> {item.restaurant_address}</span>
                      </li>
                      <li>
                        Delivery Address:
                        <span> {item.order_address}</span>
                      </li>
                      <li>
                        Order Placed Time: <span> {item.created_at}</span>
                      </li>
                      <li>
                        Order Status: <span>{item.order_status}</span>
                        {/* <img src={OrderReceivedIcon} /> */}
                      </li>

                      <div className={styles.declineAccept}>
                        <a>Decline</a>
                        <a>Accept</a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            );
          })}
          {/* Desktop */}
          {forDelivery?.map((item, index) => {
            return (
              <Container
                className={styles.orderDeliveryContainerDesktop}
                fluid
                key={index}
              >
                <Row className="mx-md-3">
                  <Col md={2} className="d-flex flex-column gap-1">
                    <div className={styles.orderId}>
                      <p>ORDER ID: {item.id}</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className={styles.customerInfo}>
                      <Row>
                        <Col md={8}>
                          <div className="d-flex gap-5">
                            <li>
                              Customer Name: <span> {item.customer_name}</span>
                            </li>
                            <li>
                              Contact Number:{" "}
                              <span>
                                {" "}
                                {item.customer_mobile || item.order_mobile}
                              </span>
                            </li>
                          </div>
                          <li>
                            Pick up Address :
                            <span> {item.restaurant_address}</span>
                          </li>
                          <li>
                            Delivery Address:
                            <span> {item.order_address}</span>
                          </li>
                          <li>
                            Order Placed Time: <span> {item.created_at}</span>
                          </li>
                        </Col>
                        <Col>
                          <li className="d-flex flex-column justify-content-center align-items-center">
                            Order Status: <span> {item.order_status}</span>
                            {/* <img src={OrderReceivedIcon} /> */}
                          </li>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={3}>
                          <div
                            className={`${styles.orderItems} overflow-hidden`}
                          >
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
                              <span> ₱{item.rider_id}.00</span>
                            </p>
                            <div className={styles.declineAccept}>
                              <a
                                type="submit"
                                onClick={() => handleCancel(item.id)}
                              >
                                Decline
                              </a>
                            </div>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className={styles.grandTotal}>
                            <p>
                              Grand Total <br />
                              <span> ₱{item.total_amount}.00</span>
                            </p>
                            <div className={styles.declineAccept}>
                              <a
                                type="submit"
                                onClick={() => handleAccept(item.id)}
                              >
                                <Link to={`/account/order/status/${item.id}`}>
                                  Accept
                                </Link>
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Container>
            );
          })}
        </Form>
      </div>
    </div>
  );
};

export default OrderContent;
