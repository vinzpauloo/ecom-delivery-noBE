import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useOrders } from "../../../hooks/useOrders";
import { getDate, getTime } from "../../../utils/formatDate";

import styles from "./OrdersContent.module.scss";

interface ContainerProps {}

type TOrder = {
  id: number;
  created_at: string;
  customer_id: number;
  customer_name: string;
  customer_mobile: string;
  delivered_at: string;
  order_address: string;
  order_status: string;
  restaurant_address: string;
};

const OrderItem = (item: TOrder, index: number) => {
  return (
    <div className={styles.item} key={index}>
      <Row>
        {/* Main content */}
        <Col lg={{ span: 9 }}>
          <Row>
            {/* Order ID */}
            <Col md={3}>
              <div className={styles.flexOnMobile}>
                <div className={styles.orderId}>
                  <h6 className="text-center text-uppercase">
                    Order ID : {item.id}
                  </h6>
                </div>

                <div className={styles.btnView}>
                  <Link to={`/account/orders/${item.id}`}>View Details</Link>
                </div>
              </div>
            </Col>

            {/* Order information */}
            <Col md={9}>
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
                            <p className={styles.value}>{item.customer_name}</p>
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
                              {item.customer_mobile}
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
                          {item.restaurant_address}
                        </p>
                      </Col>
                    </Row>

                    {/* Delivery address */}
                    <Row className="mb-2 mb-sm-3">
                      <Col sm={3} xs={5}>
                        <p>Delivery Address :</p>
                      </Col>
                      <Col sm={9} xs={7}>
                        <p className={styles.value}>{item.order_address}</p>
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
                              {getTime(item.created_at)}
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
                              {item.delivered_at
                                ? getTime(item.delivered_at)
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
                              {getDate(item.created_at)}
                            </p>
                          </Col>
                        </Row>
                      </Col>

                      {/* View details - medium screens up */}
                      <Col className="d-none d-md-block">
                        <Row>
                          <Col>
                            <div className={styles.btnView}>
                              <Link to={`/account/orders/${item.id}`}>
                                View Details
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const OrdersContent: React.FC<ContainerProps> = ({}) => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const { getOrders } = useOrders();

  const loadOrders = async () => {
    const response = await getOrders();
    console.log("getOrders response", response.data);
    setOrders(response.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className="mb-0 text-center">Order History</h1>

      <div className={styles.innerContainer}>
        {orders?.length ? (
          orders?.map((item, index) => {
            return OrderItem(item, index);
          })
        ) : (
          <h5>No orders found.</h5>
        )}
      </div>
    </div>
  );
};

export default OrdersContent;
