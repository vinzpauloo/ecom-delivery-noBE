import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import statusIsReceived from "../../assets/images/order-received.png";
import statusIsPreparing from "../../assets/images/kitchen-prep.png";
import statusIsOtw from "../../assets/images/rider-on-the-way.png";
import statusIsDelivered from "../../assets/images/delivered.png";

import styles from "./OrderContent.module.scss";
import { useOrders } from "../../hooks/useOrders";

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

const OrderContent: React.FC<ContainerProps> = ({}) => {
  const [order, setOrder] = useState<TOrder | null>(null);
  const { getOrdersById } = useOrders();

  // Get the params from the URL
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
      <div className="text-center">
        <div className={styles.title}>
          <h3>Order Tracker</h3>
          <p>Please don't close the page.</p>
        </div>

        <Row md={4} xs={1}>
          <Col>
            <div className={styles.status}>
              <img src={statusIsReceived} alt="" />
              <p>Order Received</p>
            </div>
          </Col>
          <Col>
            <div className={styles.status}>
              <img src={statusIsPreparing} alt="" />
              <p>Kitchen Preparing ...</p>
            </div>
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

      <div className={styles.testing}>
        <h6 className="mt-4 text-success">
          For testing only.
          <br />
          Order ID: {order?.id}
          <br />
          Order status: {order?.order_status || "Processing..."}
          <br />
          Created at: {order?.created_at}
        </h6>
      </div>
    </div>
  );
};

export default OrderContent;
