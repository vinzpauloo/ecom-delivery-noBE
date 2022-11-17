import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useOrders } from "../../../hooks/useOrders";

import styles from "./OrdersContent.module.scss";

interface ContainerProps {}

type TOrder = {
  id: number;
  created_at: string;
  customer_id: number;
  customer_name: string;
  customer_mobile: string;
  order_address: string;
  order_status: string;
  restaurant_address: string;
  total_amount: number;
};

const OrderItem = (item: TOrder, index: number) => {
  return (
    <div className={styles.item} key={index}>
      <Row>
        <Col lg={3}>
          {/* Order ID */}
          <div className={styles.orderId}>
            <h6 className="text-center text-uppercase">Order ID: {item.id}</h6>
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
                        <p className={styles.value}>{item.customer_name}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        <p>Contact Number:</p>
                      </Col>
                      <Col>
                        <p className={styles.value}>{item.customer_mobile}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col lg={3} xs={5}>
                    <p>Pick up Address:</p>
                  </Col>
                  <Col lg={9} xs={7}>
                    <p className={styles.value}>{item.restaurant_address}</p>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col lg={3} xs={5}>
                    <p>Delivery Address:</p>
                  </Col>
                  <Col lg={9} xs={7}>
                    <p className={styles.value}>{item.order_address}</p>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col lg={3} xs={5}>
                    <p>Order Time:</p>
                  </Col>
                  <Col lg={9} xs={7}>
                    <p className={styles.value}>{item.created_at}</p>
                  </Col>
                </Row>
              </Col>

              {/* Order status */}
              <Col lg={4}>
                <div className="text-center">
                  <p className="mb-1">Order Status:</p>
                  <p className={styles.value}>
                    {item.order_status || "Processing..."}
                  </p>
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
                      *Removed in revision <br />
                      *Displayed when clicking "View Details"
                      {/* Order list */}
                      {/* <ul className={styles.orders}>
                        <li>Ramen Noodles (3x)</li>
                        <li>Milk Tea - Watermelon (1x)</li>
                        <li>Milk Tea - Boba Soya (1x)</li>
                        <li>Pecking Duck (1x)</li>
                      </ul> */}
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
                  <p className={styles.price}>{item.total_amount} php</p>
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
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="mb-0">Order History</h1>
        <Link to="/account">Go Back</Link>
      </div>

      {orders.length ? (
        <div className={styles.innerContainer}>
          {orders?.map((item, index) => {
            return OrderItem(item, index);
          })}
        </div>
      ) : (
        <>No orders found.</>
      )}
    </div>
  );
};

export default OrdersContent;
