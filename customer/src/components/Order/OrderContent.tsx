import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { useOrders } from "../../hooks/useOrders";

import statusIsReceived from "../../assets/images/order-received.png";
import statusIsPreparing from "../../assets/images/kitchen-prep.png";
import statusIsOtw from "../../assets/images/rider-on-the-way.png";
import statusIsDelivered from "../../assets/images/delivered.png";

import styles from "./OrderContent.module.scss";
import constants from "../../utils/constants.json";

// import Pusher from "pusher-js";
// import * as PusherTypes from "pusher-js";

// var presenceChannel: PusherTypes.PresenceChannel;

// const pusher = new Pusher("dda7bca342e12a644ba2", {
//   cluster: "ap1",
// });

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
  const { getOrdersById, getOrdersByIdGuest, cancelOrderById } = useOrders();
  const isAuthenticated = useIsAuthenticated();

  // Get the params from the URL
  const { id } = useParams();

  const loadOrder = async () => {
    if (isAuthenticated()) {
      // Get user order
      const response = await getOrdersById(id);
      console.log("getOrdersById response", response);
      setOrder(response);
    } else {
      // Get guest session in local storage
      const guestSession = localStorage.getItem("guestSession");

      // Get guest order
      const response = await getOrdersByIdGuest(id, guestSession);
      console.log("getOrdersByIdGuest response", response);
      setOrder(response);
    }
  };

  const handleCancelOrder = async () => {
    console.log("Cancel order ...", id);

    const response = await cancelOrderById(id);
    console.log("cancelOrderById response", response);

    if (!response.error) {
      alert(constants.form.success.cancelOrder);
    } else {
      alert(response.error);
    }
  };

  useEffect(() => {
    loadOrder();
    // console.log(pusher);

    // pusher.connection.bind("error", function (err: any) {
    //   if (err.error.data.code === 4004) {
    //     alert("Over limit!");
    //     pusher.disconnect();
    //   }
    // });

    // const channel = pusher.subscribe("foodmonkey-channel");
    // channel.bind("ordercheckout-event", function (data: any) {
    //   console.log(data); //check data
    // });
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

              {order?.order_status === "pending" && (
                <Button
                  variant="primary"
                  className={styles.cancel}
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </Col>
          <Col>
            <div className={styles.status}>
              <img src={statusIsPreparing} alt="" />
              <p>Preparing Order</p>
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

      {/* <div className={styles.testing}>
        <h6 className="mt-4 text-success">
          For testing only.
          <br />
          Is Guest?: {!isAuthenticated() ? "yes" : "no"}
          <br />
          Can view order?: {order ? "yes" : "no"}
          <br />
          {order ? (
            <>
              Order ID: {order?.id}
              <br />
              Order status: {order?.order_status || "Processing..."}
              <br />
              Created at: {order?.created_at}
            </>
          ) : (
            <></>
          )}
        </h6>
      </div> */}
    </div>
  );
};

export default OrderContent;
