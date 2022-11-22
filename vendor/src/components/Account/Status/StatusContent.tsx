import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useOrder } from "../../../hooks/useOrder";

import statusIsReceived from "../../../assets/images/order-received.png";
import statusIsPreparing from "../../../assets/images/kitchen-prep.png";
import statusIsOtw from "../../../assets/images/rider-on-the-way.png";
import statusIsDelivered from "../../../assets/images/delivered.png";

import styles from "./StatusContent.module.scss";

interface ContainerProps {}

type ForPreparingItem = {
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

const StatusContent: React.FC<ContainerProps> = ({}) => {
  const [status, setStatus] = useState<ForPreparingItem>();
  const { updateOrder, getOrdersById } = useOrder();

  // Get the params from the url
  const { id } = useParams();

  const loadReceivedOrder = async () => {
    const response = await getOrdersById(id);
    console.log("getOrdersById response", response);
    setStatus(response);
  };

  const handleAccept = async (id: any) => {
    console.log(id);
    const response = await updateOrder(id, "preparing");
    console.log(response);
  };

  useEffect(() => {
    loadReceivedOrder();
  }, []);
  return (
    <div className={styles.container}>
      <div className="text-center">
        <div className={styles.title}>
          <h3>Order Tracker</h3>
        </div>

        <Row md={4} xs={1}>
          <Col>
            <div className={styles.status}>
              <img src={statusIsReceived} alt="" />
              <p>Order Received</p>
            </div>
            <Button disabled>Activated</Button>
          </Col>
          <Col>
            <div className={styles.status}>
              <img src={statusIsPreparing} alt="" />
              <p>Kitchen Preparing ...</p>
            </div>
            <Button type="submit" onClick={() => handleAccept(status?.id)}>
              Activate
            </Button>
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
    </div>
  );
};

export default StatusContent;
