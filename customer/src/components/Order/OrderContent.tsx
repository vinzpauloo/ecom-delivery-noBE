import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { useOrders } from "../../hooks/useOrders";

import statusIsReceived from "../../assets/images/order-received.png";
import statusIsPreparing from "../../assets/images/order-preparing.png";
import statusIsOtw from "../../assets/images/order-otw.png";
import statusIsDelivered from "../../assets/images/order-delivered.png";
import statusIsCancel from "../../assets/images/order-cancel.png";
import statusIsReceivedAlt from "../../assets/images/order-received-alt.png";
import statusIsPreparingAlt from "../../assets/images/order-preparing-alt.png";
import statusIsOtwAlt from "../../assets/images/order-otw-alt.png";
import statusIsDeliveredAlt from "../../assets/images/order-delivered-alt.png";
import statusIsCancelAlt from "../../assets/images/order-cancel-alt.png";

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
  id?: number;
  created_at?: string;
  customer_id?: number;
  customer_name?: string;
  customer_mobile?: string;
  order_address?: string;
  order_status?: string;
  restaurant_address?: string;
  total_amount?: number;
};

const OrderContent: React.FC<ContainerProps> = ({}) => {
  const [order, setOrder] = useState<TOrder>();
  const {
    getOrdersById,
    getOrdersByIdGuest,
    cancelOrderById,
    cancelOrderByIdGuest,
  } = useOrders();
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

      const newOrderObj: TOrder = { ...order, order_status: "canceled" };
      setOrder(newOrderObj);
    } else {
      alert(response.error);
    }
  };

  const handleCancelOrderGuest = async () => {
    console.log("Cancel order guest ...", id);

    // Get guest session in local storage
    const guestSession = localStorage.getItem("guestSession");

    const response = await cancelOrderByIdGuest(id, guestSession);
    console.log("cancelOrderByIdGuest response", response);

    if (!response.error) {
      alert(constants.form.success.cancelOrder);

      const newOrderObj: TOrder = { ...order, order_status: "canceled" };
      setOrder(newOrderObj);
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
              <div className={styles.imgContainer}>
                {order?.order_status === "canceled" ? (
                  <>
                    <img src={statusIsCancel} alt="" />
                    <img
                      src={statusIsCancelAlt}
                      alt=""
                      className={styles.altImg}
                    />
                    <p>Order Canceled</p>
                  </>
                ) : (
                  <>
                    <img src={statusIsReceived} alt="" />
                    {order?.order_status === "received" && (
                      <img
                        src={statusIsReceivedAlt}
                        alt=""
                        className={styles.altImg}
                      />
                    )}
                    <p>Order Received</p>
                  </>
                )}
              </div>

              {order?.order_status === "pending" && (
                <Button
                  variant="primary"
                  className={styles.cancel}
                  onClick={
                    isAuthenticated()
                      ? handleCancelOrder
                      : handleCancelOrderGuest
                  }
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </Col>
          <Col>
            <div className={styles.status}>
              <div className={styles.imgContainer}>
                <img src={statusIsPreparing} alt="" />
                {order?.order_status === "preparing" && (
                  <img
                    src={statusIsPreparingAlt}
                    alt=""
                    className={styles.altImg}
                  />
                )}
                <p>Preparing Order</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className={styles.status}>
              <div className={styles.imgContainer}>
                <img src={statusIsOtw} alt="" />
                {order?.order_status === "otw" && (
                  <img src={statusIsOtwAlt} alt="" className={styles.altImg} />
                )}
                <p>Rider on its way</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className={styles.status}>
              <div className={styles.imgContainer}>
                <img src={statusIsDelivered} alt="" />
                {order?.order_status === "delivered" && (
                  <img
                    src={statusIsDeliveredAlt}
                    alt=""
                    className={styles.altImg}
                  />
                )}
                <p>Delivered</p>
              </div>
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
